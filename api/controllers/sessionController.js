"use strict";

var bcrypt = require('bcryptjs'),
    config = require('../app.config').config,
    validator = require('validator'),
    adminModel = require('../models/adminModel'),
    Helpers = require('../libs/helpers'),
    Cookies = new (require('../libs/cookies'))();   

class sessionController {
    constructor(iApp) {
        this.app = iApp;

        this.app.all('/admin*', this.sessionHandler.bind(this));
        this.app.post('/api/session', this.setSessionHandler.bind(this));
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

module.exports = sessionController;
