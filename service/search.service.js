const Truck = require('../models/Truck.model');
const Driver = require('../models/Driver.model');


const findTruck = ({_id, createdBy, assignedTo, status, logs, dimensions, payload}) => {

  // 1. Filter Truck DB - only truck with filled assignedTo field && truck with status IS- filteredArray
  // To match = truck payload > load weight. truck dimensions > load size
  // If there is such stuck - status changed from IS to OL. Load Status - ASSIGNED, state = En route to Pick Up.
  // Appropriate info in logs - in load logs // {message: 'Load assigned', time: new Date().getTime().toString()}



};


export default findTruck;
