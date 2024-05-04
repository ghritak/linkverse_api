const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded.' });

    const username = req.query.username;

    const collection = req.database.collection('users');

    let user = await collection.findOne({ username }, { maxTimeMS: 15000 });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    if (user._id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    const result = await collection.updateOne(
      { username },
      { $set: { profile_photo: `/profile_photo/${req.file.filename}` } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        message: 'Profile picture updated successfully',
      });
    } else {
      return res.status(400).json({ message: "Couldn't upload image" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateProfilePicture;
