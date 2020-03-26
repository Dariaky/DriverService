const express = require('express');
const router = express.Router();

// const Driver = require('../../models/Driver.model');
// const Shipper = require('../../models/Shipper.model');


router
    .get('/', (req, res) => {
      res.send('Hello from profile');
    });


module.exports = router;
