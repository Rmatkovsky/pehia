import bcrypt from 'bcryptjs';
import validator from 'validator';
import config from '../../config/app.config';
import errorHandler from '../libs/errorHandler';
import UserModel from '../models/UserModel';

class UserController {
    constructor({ app, db }) {
        this.app = app;
        this.UserModel = new UserModel(db);
        this.config = config[process.env.BUILD_ENV];
        this.app.post('/login', this.validateLogin.bind(this), this.login.bind(this));
        this.app.post('/signup', this.validateSignup.bind(this), this.signup.bind(this));
    }

    login(req, res) {
        const body = req.body;
        return this.UserModel.login(body.email, body.password)
            .then(result => res.status(200).json(result))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    signup(req, res) {
        const body = req.body;
        const hashPassword = bcrypt.hashSync(body.password, this.config.salt);
        return this.UserModel.insert({ email: body.email, password: hashPassword })
            .then(() => res.status(201).json({ status: 'Created' }))
            .catch(errorHandler.badRequest.bind(this, res));
    }

    validateLogin(req, res, next) {
        const body = req.body;
        const isEmail = validator.isEmail(body.email);
        const isPassword = validator.isLength(body.password, this.UserModel.validateValues.password);

        if (!isEmail || !isPassword) {
            return errorHandler.badRequest(this, res);
        }

        return next();
    }

    validateSignup(req, res, next) {
        const errors = [];
        const body = req.body;
        const { isExistEmail } = this.UserModel;
        const isEmail = validator.isEmail(body.email);
        const isPassword = validator.isLength(body.password, this.UserModel.validateValues.password);
        const isConfirmPassword = validator.isLength(body.confirmPassword, this.UserModel.validateValues.password);

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
                    return errorHandler.conflict(res, 'Email is exist');
                }
                return next();
            })
            .catch(errorHandler.badRequest.bind(this, res));
    }
}

export default UserController;
