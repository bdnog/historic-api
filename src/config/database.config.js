const mongoose = require('mongoose');

const hostname = process.env.MONGODB_HOSTNAME || 'localhost';
const database = process.env.MONGODB_DATABASE || 'historic';
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb://${hostname}/${database}`, {
  useNewUrlParser: true,
  user: username,
  pass: password
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
