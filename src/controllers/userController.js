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
      return res.json(errorsResponse('Password should have matched!'));
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
	let verifyLink = jwt.sign({_id: user.email}, process.env.SECRET_OR_KEY);
	let regMail = format(req.body.email, 'Welcome to Express Auth', confirmation(user, verifyLink));
	sendEmail(regMail);
        res.json(successResponse('User created!'));
      })
     .catch(err => {
	console.log(err);
        res.json(errorsResponse(err));
      })
  },

  confirmUser(req, res) {
    let userId = jwt.verify(req.params.id, process.env.SECRET_OR_KEY);
    console.log(userId._id);
    User.updateOne({ email: userId._id }, { isVerified: true })
      .then(() => {
	let confirmAedMaiAl = format(userId._id, 'Thanks for your confirmation!', confirmed());
	sendEmail(confirmedMail);
        res.render('index');
      })
      .catch(err => {
        res.json(errorsResponse(err));
      })
  },

  whoAmI(req, res) {
    User.findOne({
      _id: req.user._id
    })
      .then(user => {
        res.json(successResponse({
	  name: user.name,
          email: user.email
	}))
      })
      .catch(err => {
        res.json(errorsResponse(err));
      })
  },

  testIAm(req,res) {
    res.json({
      name: "Fikri Rahmat Nurhidayat",
      age: 19
    });
  }

}
