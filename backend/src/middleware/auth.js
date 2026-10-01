const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'kavipushp_secret_2025');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
