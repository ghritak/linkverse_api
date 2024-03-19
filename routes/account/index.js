import express from 'express';
import changePassword from './changePassword.js';
import updateProfile from './updateProfile.js';
import authenticateToken from '../../middleware/authenticateToken.js';
import deleteAccount from './deleteAccount.js';
import updateProfilePicture from '../image/updateProfilePicture.js';
import { uploadProfilePhotoMulter } from '../../middleware/multerStorage.js';

const accountRouter = express.Router();

accountRouter.put('/changePassword', changePassword);
accountRouter.put('/updateProfile', authenticateToken, updateProfile);
accountRouter.delete('/deleteAccount', authenticateToken, deleteAccount);
accountRouter.post(
  '/updateProfilePicture',
  authenticateToken,
  uploadProfilePhotoMulter.single('profile_photo'),
  updateProfilePicture
);

export default accountRouter;
