import bcrypt from 'bcryptjs';
import validator from 'validator';
import config from '../../config/app.config';
import Helpers from '../libs/helpers';
import Cookies from '../libs/cookies';
import UserModel from '../models/UserModel';
import errorHandler from '../libs/errorHandler';

class SessionController {
    constructor({ app, db }) {
        this.app = app;
        this.config = config[process.env.BUILD_ENV];
        this.UserModel = new UserModel(db);
        this.app.get('/session', this.setSessionHandler.bind(this));
    }

    incorrectLoginHandler(iRes) {
        Helpers.setNotify('error', {message: 'error.login.incorrect'}, iRes);
        iRes.redirect('/admin/login');
    };

    sessionHandler(iReq, iRes, iNext) {
        if(iReq['params'][0] === '/login') {
            return iNext();
        };

        if(!Cookies.get('userId', iReq)) {
            return iRes.redirect('/admin/login');
        };

        iNext();
    };

    setSessionHandler(req, res) {
        const body = req.body;
        const isEmail = validator.isEmail(body.email);
        const isPassword = validator.isLength(body.password, this.UserModel.validateValues.password);
        const password = bcrypt.hashSync(body.password, this.config.salt);

        if (!isEmail || !isPassword) {
            return errorHandler.badRequest(res);
        }

        return this.UserModel.login(body.email, password)
            .then((result) => {
                Cookies.set('userId', result.id, res);
                return res.status(200).json(result);
            })
            .catch(errorHandler.badRequest.bind(res));

    };

};

export default SessionController;
