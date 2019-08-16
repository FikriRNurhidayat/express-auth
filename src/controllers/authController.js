const { successResponse, errorsResponse } = require('../helpers/responseFormatter.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

module.exports = {

  login(req, res) {
    // Check User model, authenticate method is declared on there!
    User.authenticate(req.body)
      .then(data => {
        res.status(200).json(successResponse(data));
      })
      .catch(err => {
        res.status(403).json(errorsResponse(err));
      })
  }
}
