const {Schema, model, Types} = require('mongoose');
// const Schema = mongoose.Schema;

const ShipperSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unicode: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  loads: [{type: Types.ObjectId, ref: 'Load'}],
});


module.exports = model('Shipper', ShipperSchema);
