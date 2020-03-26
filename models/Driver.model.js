const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  trucks: Array,
});


module.exports = mongoose.model('Driver', DriverSchema);
