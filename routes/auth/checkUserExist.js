import bcrypt from 'bcrypt';
import { validateUsername } from '../../utils/index.js';

const checkUserExist = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res
        .status(400)
        .json({ message: 'Please provide username and email.' });
    }
    if (!validateUsername(username)) {
      return res.status(400).json({
        message: 'Invalid username, Space or special charaters not allowed',
      });
    }
    const userCollection = req.database.collection('users');

    let user = await userCollection.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User with this email already exist.' });
    }
    user = await userCollection.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: 'username already exists, please try other username.',
      });
    }

    return res.status(200).json({ message: 'Good to go, user can sign up.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default checkUserExist;
