const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 108, message: 'Token gada', data: null });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key')
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error during JWT verification:', error);
    return res.status(401).json({ status: 108, message: 'Token tidak valid atau kadaluwarsa', data: null });
  }
};


module.exports = jwtMiddleware;