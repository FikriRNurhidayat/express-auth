const jwt = require('jsonwebtoken');
const { errorsResponse } = require('./responseFormatter.js');

module.exports = function (req, res, next) {
  console.log(req.headers);
  var headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).json(errorsResponse('Denied!'));
  }

  try {
    console.log(req.header.authorzation);
    req.headers.authorization = jwt.verify(headerToken.split(" ")[1], process.env.SECRET_OR_KEY); 
    next();
  }

  catch (err) {
    res.status(401).json(errorsResponse("Invalid Token!"));
  }
}
