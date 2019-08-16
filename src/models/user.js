const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: 'string',
    max: 255,
    required: true
  },
  email: {
    type: 'string',
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  isVerified: {
    type: 'boolean',
    required: true,
    default: false
  }
});

userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

User.register = function(data) {
  return new Promise(async function(resolve, reject) {
    
    // Check password and its confirmation
    if (data.password != data.password_confirmation) {
      return reject("Password and its confimration doesn't match!");
    };

    // Create hash
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(data.password, salt);

    User.create({
      name: data.name,
      email: data.email,
      password: encryptedPassword
    })
      .then(user => {
        let token = jwt.sign({ _id: user._id }, process.env.SECRET_OR_KEY);

        resolve({
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          token: token
        });
      })
      .catch(err => {
        reject("Email has already taken!");
      })
  })
}

User.authenticate = function(data) {
  return new Promise(async function(resolve, reject) {
    let user = await User.findOne({
      email: data.email
    });

    if (!user) {
      return reject("User doesn't exist!")
    }

    let isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordCorrect) {
      return reject("Wrong password!");
    }

    let token = jwt.sign({
      _id: user._id
    }, process.env.SECRET_OR_KEY);

    return resolve(token);
  })
}

module.exports = User;
