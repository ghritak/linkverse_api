import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, process.env.IMAGE_UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    return cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

export const uploadImage = multer({ storage: storage });
