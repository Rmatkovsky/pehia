import md5 from 'md5';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import _isEmpty from 'lodash/isEmpty';
import multer from 'multer';

import config from '../../config/app.config';
import errorHandler from '../libs/errorHandler';
import UserModel from '../models/UserModel';
import ImageModel from '../models/ImageModel';
import UserImageModel from '../models/UserImageModel';
import UserImageClinicModel from '../models/UserImageClinicModel';
import FacebookModel from '../libs/facebook';
import Cookies from '../libs/cookies';

class UserController {
    constructor({ app, db }) {
        this.app = app;
        this.UserModel = new UserModel(db);
        this.ImageModel = new ImageModel(db);
        this.UserImageModel = new UserImageModel(db);
        this.UserImageClinicModel = new UserImageClinicModel(db);

        this.config = config[process.env.BUILD_ENV];
        this.app.get('/me/get_images', this.validateUser.bind(this), this.getImages.bind(this));
        this.app.get('/me/get_images_clinic', this.validateUser.bind(this), this.getImagesClinic.bind(this));
        this.app.post('/activate', this.activation.bind(this));
        this.app.post('/login', this.validateLogin.bind(this), this.login.bind(this));
        this.app.post('/signup', this.validateSignup.bind(this), this.signup.bind(this));
        this.app.post('/me', this.getMe.bind(this));
        this.app.put('/me/update', this.validateUpdate.bind(this), this.updateInfo.bind(this));
        this.app.put('/me/update_avatar', this.validateAvatar.bind(this), this.updateAvatar.bind(this));
        this.app.post('/me/upload_photo', this.validatePhotos.bind(this), this.updatePhotos.bind(this));
        this.app.post('/me/upload_photo_clinic', this.validatePhotos.bind(this), this.updatePhotosClinic.bind(this));

        this.app.use( (err, req, res, next) => {
            if (err.code === 'LIMIT_FILE_SIZE') {
                console.log(err);
                return errorHandler.unprocessableEntity(res, { file: 'file too big' });
            }
            return next();
        });

    }

    validateUser(req, res, next) {
        const userId = Cookies.get('userId', req);

        if (!userId) {
            return errorHandler.unauthorized(res);
        }

        return next();
    }

    validateLogin(req, res, next) {
        const { body } = req;
        const isFacebook = !!body.facebook;
        const isGoogle = !!body.google;

        if (isGoogle || isFacebook) {
            return next();
        }
        return next();
    }

    validateSignup(req, res, next) {
        const errors = [];
        const { body } = req;
        const isEmail = body.email && validator.isEmail(body.email);
        const isPassword = body.password && validator.isLength(body.password, this.UserModel.validateValues.password);
        const isConfirmPassword =
            body.confirm_password && validator.isLength(body.confirm_password, this.UserModel.validateValues.password);

        if (!isEmail) {
            errors.push({ email: 'Invalid email' });
        }

        if (!isPassword) {
            errors.push({ password: 'Invalid password' });
        }

        if (!isConfirmPassword) {
            errors.push({ confirm_password: 'Invalid confirm password' });
        }

        if (isPassword !== isConfirmPassword) {
            errors.push({ confirm_password: 'Do not match' });
        }

        if (!isEmail || !isPassword || (isPassword !== isConfirmPassword)) {
            return errorHandler.unprocessableEntity(res, errors);
        }

        return this.UserModel.isExistEmail(body.email)
            .then((result) => {
                if (result.length) {
                    return errorHandler.conflict(res, { email: 'Email is exist' });
                }
                return next();
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }

    validateUpdate(req, res, next) {
        const { body } = req;
        const userId = Cookies.get('userId', req);

        if (!userId) {
            return errorHandler.unauthorized(res);
        }
        return next();
    }

    validateAvatar(req, res, next) {
        const userId = Cookies.get('userId', req);

        if (!userId) {
            return errorHandler.unauthorized(res);
        }

        const storage = multer.diskStorage({
            destination: `${process.cwd()}/upload/avatars`,
            filename(r, file, cb) {
                cb(null, `${new Date().getTime()}-${file.originalname}`);
            },
        });

        const upload = multer({
            limits: {
                fileSize: 1024 * 1024,
            },
            storage,
        });

        return upload.single('file')(req, res, next);
    }

    validatePhotos(req, res, next) {
        const userId = Cookies.get('userId', req);

        if (!userId) {
            return errorHandler.unauthorized(res);
        }

        const storage = multer.diskStorage({
            destination: `${process.cwd()}/upload/images`,
            filename(r, file, cb) {
                cb(null, `${new Date().getTime()}-${file.originalname}`);
            },
        });

        const upload = multer({
            limits: {
                fileSize: 1024 * 1024,
            },
            storage,
        });

        return upload.array('files')(req, res, next);
    }

    activation(req, res) {
        const { body } = req;

        if (validator.isHash(body.token, 'md5')) {
            return this.UserModel.activate(body.token)
                .then((result) => {
                    if (result.changedRows) {
                        return res.status(200).json({ status: 'updated' });
                    }
                    return errorHandler.badRequest(res);
                })
                .catch(errorHandler.badRequest.bind(this, res));
        }

        return errorHandler.badRequest(res);
    }

    getMe(req, res) {
        const userId = Cookies.get('userId', req);
        if (userId) {
            return this.UserModel.getInfo(userId)
                .then((result) => {
                    if (!_isEmpty(result)) {
                        return res.status(200).json(result[0]);
                    }
                    return errorHandler.unauthorized(res);
                })
                .catch(errorHandler.unauthorized.bind(this, res));
        }
        return errorHandler.unauthorized(res);
    }

    login(req, res) {
        const { body } = req;

        if (body.facebook) {
            return this.loginByFacebook(req, res);
        }

        if (body.google) {
            return body.google;
        }

        return this.UserModel.login(body.email, body.password)
            .then((result) => {
                if (_isEmpty(result)) {
                    return errorHandler.notFound(res, { email: 'Email or password was wrong' });
                }

                Cookies.set('userId', result.id, res);
                return res.status(200).json(result);
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }

    loginByFacebook(req, res) {
        const { body } = req;
        const FB = new FacebookModel();
        const results = {};
        return FB.getUserInfo(body.facebook)
            .then((fbResult) => {
                results.fb = fbResult;
                return this.UserModel.isExistEmail(fbResult.email);
            })
            .then((isExistResult) => {
                results.exist = isExistResult;
                if (_isEmpty(isExistResult)) {
                    return this.UserModel.addUserByFacebook(results.fb);
                }

                Cookies.set('userId', isExistResult[0].id, res);
                return res.status(200).json(isExistResult[0]);
            })
            .then(insertResult => this.UserModel.getInfo(insertResult.insertId))
            .then((userResult) => {
                Cookies.set('userId', userResult[0].id, res);
                return res.status(200).json(userResult[0]);
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }

    signup(req, res) {
        const { body } = req;
        const hashPassword = bcrypt.hashSync(body.password, config.salt);
        const activityCode = md5(body.email);
        return this.UserModel.insert({ email: body.email, password: hashPassword, activity_code: activityCode })
            .then(() => res.status(201).json({ status: 'Created' }))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    updateInfo(req, res) {
        const { body } = req;
        const userId = Cookies.get('userId', req);

        return this.UserModel.updateInfo(userId, body)
            .then(this.getMe.bind(this, req, res))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    updateAvatar(req, res) {
        const userId = Cookies.get('userId', req);

        return this.UserModel.updateInfo(userId, { avatar: req.file.filename })
            .then(this.getMe.bind(this, req, res))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    updatePhotos(req, res) {
        const userId = Cookies.get('userId', req);
        const { files } = req;
        const promises = [];

        files.forEach((item) => {
            promises.push(
                this.ImageModel.addImage(item.filename)
                .then(result => this.UserImageModel.addImage(userId, result.insertId)),
            );
        });

        Promise.all(promises)
            .then(() => this.UserImageModel.getByUser(userId))
            .then(result => res.status(200).json(result))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    updatePhotosClinic(req, res) {
        const userId = Cookies.get('userId', req);
        const { files } = req;
        const promises = [];

        files.forEach((item) => {
            promises.push(
                this.ImageModel.addImage(item.filename)
                    .then(result => this.UserImageClinicModel.addImage(userId, result.insertId)),
            );
        });
        Promise.all(promises)
            .then(() => this.UserImageClinicModel.getByUser(userId))
            .then(result => res.status(200).json(result))
            .catch(err => {console.log(err);errorHandler.badRequest.bind(this, res)});
    }

    getImages(req, res) {
        const userId = Cookies.get('userId', req);
        this.UserImageModel.getByUser(userId)
            .then(result => res.status(200).json(result))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    getImagesClinic(req, res) {
        const userId = Cookies.get('userId', req);
        this.UserImageClinicModel.getByUser(userId)
            .then(result => res.status(200).json(result))
            .catch(errorHandler.badRequest.bind(this, res));
    }
}

export default UserController;
