import express from 'express';
import authenticateToken from '../../middleware/authenticateToken.js';
import getLinkByUserName from './getLinkbyUserName.js';

const linkRouter = express.Router();

// linkRouter.post('/api', login);
linkRouter.get('/', getLinkByUserName);

export default linkRouter;
