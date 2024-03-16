import express from 'express';
import authenticateToken from '../../middleware/authenticateToken.js';
import getUser from './getUser.js';
import postLink from './postLink.js';

const linkRouter = express.Router();

// linkRouter.post('/api', login);
linkRouter.get('/', getUser);
linkRouter.post('/', authenticateToken, postLink);

export default linkRouter;
