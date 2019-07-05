const bcrypt = require('bcryptjs');

module.exports = function(data) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
}
