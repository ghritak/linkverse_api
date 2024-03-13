import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Please try to login with correct credentials.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const authorizationToken = jwt.sign(
        { user_id: user._id.toString() },
        process.env.SECRET_KEY,
        {
          expiresIn: 3 * 24 * 60 * 60 * 1000,
        }
      );
      res.cookie('Authorization', authorizationToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      });
      return res.status(200).json({
        message: 'Logged in successfully',
        data: {
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          email: user.email,
        },
        token: authorizationToken,
      });
    } else {
      return res.status(404).json({ message: 'Password is invalid.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default login;
