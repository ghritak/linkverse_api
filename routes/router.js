import express from 'express';
import login from './auth/login.js';
import changePassword from './auth/changePassword.js';
import signup from './auth/signup.js';
import updateProfile from './auth/updateProfile.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

const home = (req, res) => {
  res.send('Welcome to linkverse 🙏');
};
router.get('/api', home);
router.post('/login', login);
router.post('/signup', signup);
router.put('/changePassword', changePassword);
router.put('/updateProfile', authenticateToken, updateProfile);

export default router;
