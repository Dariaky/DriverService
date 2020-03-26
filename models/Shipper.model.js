const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipperSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  loads: Array,
});


module.exports = mongoose.model('Shipper', ShipperSchema);
