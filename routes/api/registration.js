const express = require('express');
const router = express.Router();

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

// const bcrypt = require('bcrypt');

router
    // .get('/drivers', (req, res) => {
    //   Driver.find({})
    //       .exec((err, users) => {
    //         if (err) {
    //           res.send('Error with users has occurred');
    //         } else {
    //           res.json(users);
    //         }
    //       });
    // })
    .post('/', async (req, res) => {
      switch (req.body.role) {
        case 'driver': {
          try {
            const driver = await new Driver({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
            });
            driver.save();
            res.json({driver, status: 'OK'});
          } catch (err) {
            res.status(500).json({status: err.message});
          }
          break;
        }
        case 'shipper': {
          try {
            const shipper = await new Shipper({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
            });
            shipper.save();
            res.json({shipper});
          } catch (err) {
            res.status(500).json({status: err.message});
          }
          break;
        }
      }
    });

module.exports = router;
