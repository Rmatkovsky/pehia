import bcrypt from 'bcryptjs';
    // config = require('../app.config').config,
import validator from 'validator';
import Helpers from '../libs/helpers';
import Cookies from '../libs/cookies';

class SessionController {
    constructor(iApp) {
        this.app = iApp;
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

    setSessionHandler(iReq, iRes) {
        var body = iReq['body'],
            isUsername = validator.isLength(body['username'], 3, 20),
            isPassword = validator.isLength(body['password'], 5, 20),
            password;

        if(!isUsername || !isPassword) {
            return this.incorrectLoginHandler(iRes);
        };

        password = bcrypt.hashSync(body['password'], config.salt);

        adminModel.findOne({username: body['username'], password: password})
        .then( iResult => {
            Cookies.set('userId', iResult['_id'], iRes);
            iRes.redirect('/admin');
        })
        .catch(this.incorrectLoginHandler.bind(null, iRes));

    };

};

export default SessionController;
