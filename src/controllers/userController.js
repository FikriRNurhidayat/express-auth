const User = require('../models/user.js');
const Servant = require('../models/servant.js');
const { successResponse, errorsResponse } = require('../helpers/responseFormatter.js');
const encryptor = require('../helpers/bcrypt.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail, format, confirmation, confirmed } = require('../helpers/mailer.js');

module.exports = {

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
      _id: req.headers.authorization._id
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
  },

  currentUser(req, res) {
    let user = jwt.verify(req.headers.authorization, process.env.SECRET_OR_KEY);
    User.findById(user._id)
      .then(data => {
        res.status(200).json(successResponse(data));
      })
  },

  servant(req, res) {
    Servant.create(req.body)
      .then(data => {
        console.log(req.body);
        res.status(200).json(successResponse("Diancuk"));
      })
  }
}
