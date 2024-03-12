import users from '../models/UserModel.js';

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const users = req.database.collection('users');
    let userEmail = await users.findOne({ email }, { maxTimeMS: 15000 });
    if (!userEmail) {
      return res
        .status(400)
        .json({ message: 'Please try to login with correct credentials.' });
    }

    res.json(userEmail);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signup = (req, res) => {
  console.log(req, res);
  res.send('signup');
};
