const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    max: 255,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

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
