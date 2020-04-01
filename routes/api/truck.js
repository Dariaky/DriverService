const express = require('express');
const router = express.Router();

const Driver = require('../../models/Shipper.model');
const Truck = require('../../models/Truck.model');


router
    .post('/create-truck', async (req, res) => { // we collect data from form and forming Truck object in DB with its own id
    // type: 'SMALL', assignedTo: 'driverId or null', createdBy: 'DriverId', status: 'IS if assigned or null if not assigned'
    // Initially let it be null!!
    // pushed to Driver trucks array
      try {

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })
    .put('/:id/update-truck', async (req, res) => { // here we receive updated params about truck - type if assigned === null
    // updating in Truck DB
    // updating Driver loads array
      try {

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })
    .delete('/:id/delete-truck', async (req, res) => { // removing by id from Truck DB and from Drivers Array if assigned === null
      try {

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })
    .put('/:id', async (req, res) => {
    // somehow we need to let driver know his truck was chosen.
    // If so - there will be two options to change load status


      try {

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    });


module.exports = router;
