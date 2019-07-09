const { successResponse, errorsResponse } = require('../helpers/responseFormatter.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

module.exports = {

  login(req, res) {
    console.log(req.body);
    // Validate if email exists
    User.findOne({
      email: req.body.email
    })
      .then(data => {
	var isPasswordCorrect = bcrypt.compareSync(req.body.password, data.password);
	if (!isPasswordCorrect) {
	  return res.status(422).json(errorsResponse("Wrong password!"));
	}

	var token = jwt.sign({_id: data._id}, process.env.SECRET_OR_KEY);
	res.status(201).json(successResponse(token));
      })
      .catch(err => {
        res.status(404).json(errorsResponse("User doesn't exist!"))
      })
  }
}
