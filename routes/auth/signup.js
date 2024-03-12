import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const { fname, lname, username, email, password } = req.body;
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User with this email already exist.' });
    }
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    await collection.insertOne({
      fname,
      lname,
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default signup;
