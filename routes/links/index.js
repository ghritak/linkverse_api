import express from 'express';
import authenticateToken from '../../middleware/authenticateToken.js';
import getLinkByUserName from './getLinkbyUserName.js';
import postLink from './postLink.js';

const linkRouter = express.Router();

// linkRouter.post('/api', login);
linkRouter.get('/', getLinkByUserName);
linkRouter.post('/', authenticateToken, postLink);

export default linkRouter;
