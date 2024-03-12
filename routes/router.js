import express from 'express';
import { changePassword, login, signup } from './auth.js';

const router = express.Router();

const home = (req, res) => {
  res.send('Welcome to linkverse 🙏');
};
router.get('/api', home);
router.post('/login', login);
router.post('/signup', signup);
router.post('/changePassword', changePassword);

export default router;
