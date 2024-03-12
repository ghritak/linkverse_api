import jwt from 'jsonwebtoken';

// Middleware to verify JWT token and attach user information to req.user
const authenticateToken = (req, res, next) => {
  // Get the JWT token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    // Attach user information to req.user
    req.user = user;
    next(); // Call next middleware
  });
};

export default authenticateToken;
