import express from 'express';
import changePassword from './changePassword.js';
import updateProfile from './updateProfile.js';
import authenticateToken from '../../middleware/authenticateToken.js';
import deleteAccount from './deleteAccount.js';
import updateProfilePicture from './updateProfilePicture.js';

const accountRouter = express.Router();

accountRouter.put('/changePassword', changePassword);
accountRouter.put('/updateProfile', authenticateToken, updateProfile);
accountRouter.delete('/deleteAccount', authenticateToken, deleteAccount);
accountRouter.put(
  '/updateProfilePicture',
  authenticateToken,
  updateProfilePicture
);

export default accountRouter;
