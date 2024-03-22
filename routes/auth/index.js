import express from 'express';
import login from './login.js';
import signup from './signup.js';
import checkUserExist from './checkUserExist.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.post('/signup/check_user_exist', checkUserExist);

export default authRouter;
