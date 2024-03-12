const updateProfile = async (req, res) => {
  try {
    const { email, fname, lname, username } = req.body;
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }

    const result = await collection.updateOne(
      { email: email },
      { $set: { fname, lname, username } }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: 'Profile updated successfully',
        data: { fname, lname, username, email },
      });
    } else {
      return res.status(200).json({
        message: 'Profile already up to date',
        data: { fname, lname, username, email },
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateProfile;