const express = require('express');
const router = express.Router();

// const Driver = require('../../models/Driver.model');
// const Shipper = require('../../models/Shipper.model');

//   /profile
router
    .get('/', (req, res) => {
      console.log(req.token);
      res.status(200).json({status: 'It is working'});
    });


module.exports = router;
