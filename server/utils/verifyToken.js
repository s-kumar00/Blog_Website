const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error')


const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.clearCookie('access_token');
    return next(errorHandler(201, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.clearCookie('access_token');
      return next(errorHandler(201, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
