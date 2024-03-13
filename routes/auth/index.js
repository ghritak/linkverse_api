import express from 'express';
import login from './login.js';
import signup from './signup.js';
import changePassword from './changePassword.js';
import updateProfile from './updateProfile.js';
import authenticateToken from '../../middleware/authenticateToken.js';
import deleteAccount from './deleteAccount.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.put('/changePassword', changePassword);
authRouter.put('/updateProfile', authenticateToken, updateProfile);
authRouter.delete('/deleteAccount', authenticateToken, deleteAccount);

export default authRouter;
