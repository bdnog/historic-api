const mongoose = require('../../config/database.config');

const schema = new mongoose.Schema({
  company: {
    type: String,
    select: false,
    required: true
  },
  customer: {
    type: String,
    select: false,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Historic = mongoose.model('Historic', schema);

module.exports = Historic;
