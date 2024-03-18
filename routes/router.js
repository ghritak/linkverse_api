import express from 'express';
import authRouter from './auth/index.js';
import linkRouter from './links/index.js';
import getLinkData from './constants/getLinkData.js';
import accountRouter from './account/index.js';

const router = express.Router();

const home = (req, res) => {
  res.send('Welcome to linkverse 🙏');
};
router.get('/api', home);
router.use('/api/link', linkRouter);
router.get('/api/getLinkData', getLinkData);
router.use('/', authRouter);
router.use('/profile', accountRouter);

export default router;
