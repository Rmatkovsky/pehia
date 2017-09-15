import express from 'express';
import UserController from './controllers/userController';
import SessionController from './controllers/sessionController';

const Router = express.Router();

new SessionController(Router); // eslint-disable-line no-new
new UserController(Router); // eslint-disable-line no-new

export default Router;

