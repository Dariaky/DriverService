const {Schema, model, Types} = require('mongoose');


const TruckSchema = new Schema({
  createdBy: {type: Types.ObjectId, ref: 'Driver'},
  assignedTo: {type: Types.ObjectId, ref: 'Driver'},
  status: {type: String, required: true},
  state: {type: String, required: true},
});


module.exports = model('Truck', TruckSchema);
