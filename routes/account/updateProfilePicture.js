import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.IMAGE_UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profile_photo');

const updateProfilePicture = async (req, res) => {
  try {
    const username = req.query.username;
    const collection = req.database.collection('users');

    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }

    if (user._id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        if (req.file) {
          await collection.updateOne(
            { username },
            { $set: { profile_photo: req.file.path } }
          );
        }

        if (result.modifiedCount > 0) {
          return res.status(200).json({
            message: 'Profile updated successfully',
            data: { profile_photo },
          });
        } else {
          return res.status(200).json({
            message: 'Profile already up to date',
            data: { profile_photo },
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateProfilePicture;
