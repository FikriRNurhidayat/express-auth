const Validator = require('fastest-validator');
const validator = new Validator();

var userSchema = require('../../models/user.js').schema.obj;
for (let i in userSchema) {
  delete userSchema[i].default;
  delete userSchema[i].lowercase;
  delete userSchema[i].unique;
  if (i !== 'name') {
    userSchema[i].min = 6;
  }
  if (i == 'isVerified') {
    delete userSchema[i];
  };
};

module.exports = {
  loginValidator: function(data) {
    delete userSchema.name;
    delete userSchema.password_confirmation;
    return validator.compile(userSchema)(data);
  },

  registerValidator: function(data) {
    userSchema.password_confirmation = userSchema.password;
    return validator.compile(userSchema)(data);
  }
}
