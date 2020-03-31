const { Schema, model, Types } = require('mongoose');

const LoadSchema = new Schema({
  createdBy: {type: Types.ObjectId, ref: 'Shipper'},
  assignedTo: {type: Types.ObjectId, ref: 'Shipper'},
  logs: [{
    message: {type: String, required: true},
    time: {type: String, required: true}
  }],
  status: {type: String, required: true},
  state: {type: String, required: true},
  dimensions: {
    width: {type: Number},
    length: {type: Number},
    height: {type: Number}
  },
  payload: {type: Number}
});

module.exports = model('Load', LoadSchema);
