const express = require('express');
const router = express.Router();

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const authorizationService = require('../../service/auth.service');

// const bcrypt = require('bcrypt');


router
    .post('/', async (req, res) => {
      switch (req.body.role) {
        case 'driver': {
          try {
            const driver = await Driver.findOne({
              email: req.body.email,
              password: req.body.password,
            });
            if (driver) {
              // Creating jwt token
              const jwtToken = await authorizationService.createToken(driver, {});
              res.status(200).json({jwtToken});
            } else {
              return res.status(403).json({
                message: 'Incorrect username or password',
              });
            }
          } catch (err) {
            res.status(500).json({status: err.message});
          }
          break;
        }
        case 'shipper': {
          try {
            const shipper = await Shipper.findOne({
              email: req.body.email,
              password: req.body.password,
            });
            if (shipper) {
              // Creating jwt token
              const jwtToken = await authorizationService.createToken(shipper, {});
              res.status(200).json({jwtToken});
            } else {
              return res.status(403).json({
                message: 'Incorrect username or password',
              });
            }
          } catch (err) {
            res.status(500).json({status: err.message});
          }
          break;
        }
      }
    }
    );


module.exports = router;
