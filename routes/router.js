import express from 'express';
import login from './auth/login.js';
import changePassword from './auth/changePassword.js';
import signup from './auth/signup.js';

const router = express.Router();

const home = (req, res) => {
  res.send('Welcome to linkverse 🙏');
};
router.get('/api', home);
router.post('/login', login);
router.post('/signup', signup);
router.put('/changePassword', changePassword);

export default router;
