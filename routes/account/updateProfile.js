const updateProfile = async (req, res) => {
  try {
    const { email, name, username } = req.body;
    const collection = req.database.collection('users');

    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }

    if (user._id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    const result = await collection.updateOne(
      { email: email },
      { $set: { name, username } }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: 'Profile updated successfully',
        data: { name, username, email },
      });
    } else {
      return res.status(200).json({
        message: 'Profile already up to date',
        data: { name, username, email },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateProfile;
