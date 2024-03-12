import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = (req, res) => {
  console.log(req, res);
  res.send('signup');
};

export default signup;
