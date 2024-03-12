import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }
    const salt = await bcrypt.genSalt(10);
    let securePaaword = await bcrypt.hash(password, salt);

    const result = await collection.updateOne(
      { email: email },
      { $set: { password: securePaaword } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default changePassword;
