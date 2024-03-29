import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user_id = decodedToken.user_id;
    next();
  });
};

export default authenticateToken;
