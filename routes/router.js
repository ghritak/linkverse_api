import express from 'express';
import authRouter from './auth/index.js';
import linkRouter from './links/index.js';
import getLinkData from './utils/getLinkData.js';
import accountRouter from './account/index.js';
import uploadLogo from './image/uploadLogo.js';
import { uploadLogoMulter } from '../middleware/multerStorage.js';
import { sendVerificationEmail } from './utils/sendEmailOtp.js';
import { verifyEmail } from './utils/verifyOtp.js';

const router = express.Router();

const home = (req, res) => {
  res.send('Welcome to linkverse 🙏');
};
router.get('/api', home);
router.use('/', authRouter);
router.use('/api/link', linkRouter);
router.get('/api/getLinkData', getLinkData);
router.use('/profile', accountRouter);
router.post('/uploadLogo', uploadLogoMulter.single('logo'), uploadLogo);
router.post('/api/send_verification_email', sendVerificationEmail);
router.post('/api/verify_email', verifyEmail);

export default router;
