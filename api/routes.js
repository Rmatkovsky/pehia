import express from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';


export default (db) => {
    const Router = express.Router();

    new SessionController({ app: Router, db }); // eslint-disable-line no-new
    new UserController({ app: Router, db }); // eslint-disable-line no-new

    return Router;
};

