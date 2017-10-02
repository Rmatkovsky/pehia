import md5 from 'md5';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import _isEmpty from 'lodash/isEmpty';

import config from '../../config/app.config';
import errorHandler from '../libs/errorHandler';
import UserModel from '../models/UserModel';
import FacebookModel from '../libs/facebook';
import Cookies from '../libs/cookies';


class UserController {
    constructor({ app, db }) {
        this.app = app;
        this.UserModel = new UserModel(db);
        this.config = config[process.env.BUILD_ENV];
        this.app.post('/activation', this.activation.bind(this));
        this.app.post('/login', this.validateLogin.bind(this), this.login.bind(this));
        this.app.post('/signup', this.validateSignup.bind(this), this.signup.bind(this));
    }

    validateLogin(req, res, next) {
        const body = req.body;
        const isFacebook = !!body.facebook;
        const isGoogle = !!body.google;

        if (isGoogle || isFacebook) {
            return next();
        }
        return next();

        // const isEmail = validator.isEmail(body.email || '');
        // const isPassword = validator.isLength(body.password, this.UserModel.validateValues.password);
        //
        // if (!isEmail || !isPassword) {
        //     return errorHandler.badRequest(this, res);
        // }
        //
        // return next();
    }

    validateSignup(req, res, next) {
        const errors = [];
        const body = req.body;
        const { isExistEmail } = this.UserModel;
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

        return isExistEmail(body.email)
            .then((result) => {
                if (result.length) {
                    return errorHandler.conflict(res, { email: 'Email is exist' });
                }
                return next();
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }

    activation(req, res) {
        const body = req.body;

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

    login(req, res) {
        const body = req.body;

        if (body.facebook) {
            return this.loginByFacebook(req, res);
        }

        if (body.google) {
            return body.google;
        }

        return this.UserModel.login(body.email, body.password)
            .then((result) => {
                if (_isEmpty) {
                    return errorHandler.notFound(res, { email: 'Email or password was wrong' });
                }

                Cookies.set('userId', result.id, res);
                return res.status(200).json(result);
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }

    loginByFacebook(req, res) {
        const body = req.body;
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
            .then((insertResult) => {
                this.UserModel.getInfo(insertResult.insertId);
            })
            .then((userResult) => {
                Cookies.set('userId', userResult[0].id, res);
                return res.status(200).json(userResult[0]);
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }

    signup(req, res) {
        const body = req.body;
        const hashPassword = bcrypt.hashSync(body.password, this.config.salt);
        const activityCode = md5(body.email);
        return this.UserModel.insert({ email: body.email, password: hashPassword, activity_code: activityCode })
            .then(() => res.status(201).json({ status: 'Created' }))
            .catch(errorHandler.badRequest.bind(this, res));
    }
}

export default UserController;
