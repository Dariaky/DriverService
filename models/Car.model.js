const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  model: String,
  type: String,
  owner: 'User',
});


module.exports = mongoose.model('User', CarSchema);
