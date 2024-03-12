import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = req.database.collection('users');
    let user = await data.findOne({ email }, { maxTimeMS: 15000 });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Please try to login with correct credentials.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(404).json({ message: "Couldn't login user" });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signup = (req, res) => {
  console.log(req, res);
  res.send('signup');
};

export const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }
    const salt = await bcrypt.genSalt(10);
    let securePaaword = await bcrypt.hash(password, salt);
    console.log(securePaaword);

    const result = await collection.updateOne(
      { email: email },
      { $set: { password: securePaaword } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
