import bcrypt from 'bcrypt';

const changeTheme = async (req, res) => {
  try {
    const { email, themeCode } = req.query;
    console.log(email, themeCode);
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    if (user._id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    const result = await collection.updateOne(
      { email: email },
      { $set: { theme: themeCode } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Theme changed successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default changeTheme;
