const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servantSchema = new Schema({
  name: {
    type: 'string',
    max: 255,
    required: true
  },
  key: {
    type: 'string'
  }
});

module.exports = mongoose.model('Servant', servantSchema);
