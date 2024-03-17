import express from 'express';
import authenticateToken from '../../middleware/authenticateToken.js';
import getUser from './getUser.js';
import postLink from './postLink.js';
import getUserProfile from './getUserProfile.js';

const linkRouter = express.Router();

linkRouter.get('/', getUser);
linkRouter.get('/auth/', authenticateToken, getUserProfile);
linkRouter.post('/', authenticateToken, postLink);

export default linkRouter;
