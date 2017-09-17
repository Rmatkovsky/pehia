import validator from 'validator';
import Helpers from '../libs/helpers';
import UserModel from '../models/UserModel';

class UserController {
    constructor(iApp) {
        this.UserModel = new UserModel();
        this.app = iApp;
        this.app.get('/login', this.login.bind(this));
        this.app.post('/signup', this.validateUser.bind(this), this.signup.bind(this));
    }

    login(iRes) {
        const { isExistEmail } = this.UserModel;
        const result = isExistEmail('matkovsky.ruslan@gmail.com');
        return iRes.json(result);
    }

    signup(iRes) {
        return iRes;
    }

    validateUser(iReq, iRes, iNext) {
        const body = iReq.body;
        const isName = validator.isLength(body.name, userModel.validateValues.name);
        const isLastName = validator.isLength(body.lastName, userModel.validateValues);

        if (!isName || !isLastName) {
            Helpers.setNotify('error', {name: !isName, keywords: !isKeywords}, iRes);
            return iRes.redirect(iReq.get('referer'));
        }

        return iNext();
    }
}

export default UserController;
