import express from 'express';
import login from './login.js';
import signup from './signup.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
// authRouter.put('/changePassword', changePassword);
// authRouter.put('/updateProfile', authenticateToken, updateProfile);
// authRouter.delete('/deleteAccount', authenticateToken, deleteAccount);

export default authRouter;
