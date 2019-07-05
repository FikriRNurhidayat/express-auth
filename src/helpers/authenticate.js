const jwt = require('jsonwebtoken');
const { errorsResponse } = require('./responseFormatter.js');

module.exports = function (req, res, next) {
  var headerToken = req.headers.authorization;
  if (!headerToken) {
    res.json(errorsResponse('Denied!'));
  }

  var isUser = jwt.verify(headerToken, process.env.SECRET_OR_KEY);
  if (isUser) {
    req.user = isUser;
    next();
  } else {
    res.status(400).json(errorsResponse('Invalid token!'));
  }
}
