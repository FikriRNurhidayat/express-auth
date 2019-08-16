const { successResponse, errorsResponse } = require('../helpers/responseFormatter.js');
const User = require('../models/user.js');
const { 
  authValidator: {
    loginValidator,
    registerValidator
  } 
} = require('../helpers/validators/');
const { sendEmail, format, confirmation } = require('../helpers/mailer.js');

module.exports = {

  login(req, res) {
    let isValid = loginValidator(req.body);
    if (isValid == true) {
      // Check User model, authenticate method is declared on there!
      return User.authenticate(req.body)
        .then(data => {
          res.status(200).json(successResponse(data));
        })
        .catch(err => {
          console.log(err)
          res.status(403).json(errorsResponse(err));
        })
    }

    console.log(isValid);
    return res.status(400).json(errorsResponse(isValid));
  },

  register(req, res) {
    let isValid = registerValidator(req.body);

    if (isValid == true) {
    return User.register(req.body)
      .then(data => {
        let activationEmail = format(req.body.email, 'Welcome to Express Auth', confirmation(data, data.token));
        sendEmail(activationEmail);
        res.status(201).json(successResponse(data));
      })
      .catch(err => {
        res.status(422).json(errorsResponse(err));
      });
    }

    return res.status(400).json(errorsResponse(isValid));
  }
};
