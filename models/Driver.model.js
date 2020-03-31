const {Schema, model, Types} = require('mongoose');

const DriverSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unicode: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  trucks: [{type: Types.ObjectId, ref: 'Truck'}],
});


module.exports = model('Driver', DriverSchema);
