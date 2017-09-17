import express from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
// console.log('global', global.db);
const Router = express.Router();

new SessionController(Router); // eslint-disable-line no-new
new UserController(Router); // eslint-disable-line no-new

export default Router;

