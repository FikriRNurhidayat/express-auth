const jwt = require('jsonwebtoken');
const { errorsResponse } = require('./responseFormatter.js');
const User = require('../models/user.js');

module.exports = async function (req, res, next) {
  var headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).json(errorsResponse('Denied!'));
  }

  try {
    req.headers.authorization = jwt.verify(headerToken.split(" ")[1], process.env.SECRET_OR_KEY); 
    let user = await User.findById(req.headers.authorization);
    if (!user) return res.status(404).json(errorsResponse("User doesn't exist!"));

    next();
  }

  catch (err) {
    res.status(401).json(errorsResponse("Invalid Token!"));
  }
}
