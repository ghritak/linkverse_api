import bcrypt from 'bcrypt';

const signup = async (req, res) => {
  try {
    const { fname, lname, username, email, password } = req.body;
    if (!fname || !lname || !username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide all the details.' });
    }
    const userCollection = req.database.collection('users');
    const linksCollection = req.database.collection('links');
    let user = await userCollection.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User with this email already exist.' });
    }
    user = await userCollection.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User with this username already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      fname,
      lname,
      username,
      email,
      password: hashedPassword,
      profile_photo: '',
      banner_photo: '',
    };

    await userCollection.insertOne(userData);

    await linksCollection.insertOne({
      username,
      links: [],
    });

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default signup;
