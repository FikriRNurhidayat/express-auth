const User = require('../models/user.js');
const { successResponse, errorsResponse } = require('../helpers/responseFormatter.js');
const encryptor = require('../helpers/bcrypt.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail, format, confirmation, confirmed } = require('../helpers/mailer.js');

module.exports = {

  createUser(req, res) {
    // Validate if password field and password_confirmation field are matched
    if (req.body.password !== req.body.password_confirmation) {
      return res.status(422).json(errorsResponse('Password should have matched!'));
    }

    // Encrypt inputted password from user
    var encryptedPassword = encryptor(req.body.password);

    // Create new user after passing requirement above
    var userPromise = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword
    });
    userPromise.save()
      .then((user) => {
        let token = jwt.sign({_id: user._id}, process.env.SECRET_OR_KEY);
        let regMail = format(req.body.email, 'Welcome to Express Auth', confirmation(user, token));
        sendEmail(regMail);
        res.status(201).json(successResponse(token));
      })
     .catch(err => {
        res.status(422).json(errorsResponse(err.message));
      })
  },

  confirmUser(req, res) {
    let userId = jwt.verify(req.params.id, process.env.SECRET_OR_KEY);

    User.findOne({ _id: userId._id }, (err, data) => {
      if (data.isVerified == false) {
        return User.findOneAndUpdate({ _id: userId._id }, { isVerified: true })
          .then(user => {
            let confirmedMail = format(data.email, 'Thanks for your confirmation!', confirmed());
            sendEmail(confirmedMail);
            res.redirect('/');
          })
          .catch(err => {
            res.status(422).json(errorsResponse(err));
          })
      }

      res.redirect('/')
    })
  },

  whoAmI(req, res) {
    User.findOne({
      _id: req.user._id
    })
      .then(user => {
        res.json(successResponse({
          name: user.name,
          isVerified: user.isVerified
        }));
      })
      .catch(err => {
        res.json(errorsResponse(err));
      })
  }
}
