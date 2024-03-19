import multer from 'multer';

export const uploadProfilePhotoMulter = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, process.env.PROFILE_PHOTO_FOLDER);
    },
    filename: function (req, file, cb) {
      return cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    },
  }),
});

export const uploadLogoMulter = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, process.env.LOGO_FOLDER);
    },
    filename: function (req, file, cb) {
      return cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    },
  }),
});
