import mysql from 'mysql';
import validator from 'validator';
import Helpers from '../libs/helpers';
import userModel from '../models/userModel';

class UserController {
    constructor(iApp) {
        this.app = iApp;

        this.app.post('/login', this.login.bind(this));
        this.app.post('/signup', this.validateUser.bind(this), this.signup.bind(this));

    }

    login(iRes) {
        return {};
    }

    signup(iRes) {

    }

    validateUser(iReq, iRes, iNext) {
        const body = iReq.body;
        const isName = validator.isLength(body.name, userModel.validateValues.name);
        const isLastName = validator.isLength(body.lastName, userModel.validateValues);

        if(!isName || !isLastName) {
            Helpers.setNotify('error', {name: !isName, keywords: !isKeywords}, iRes);
            return iRes.redirect(iReq.get('referer'));
        };

        iNext();
    };

}

export default UserController;
