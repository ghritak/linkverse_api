import express from 'express';
import authRouter from './auth/index.js';
import linkRouter from './links/index.js';

const router = express.Router();

const home = (req, res) => {
  res.send('Welcome to linkverse 🙏');
};
router.get('/api', home);
router.use('/api/link', linkRouter);
router.use('/', authRouter);

export default router;
