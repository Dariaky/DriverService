const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const bcrypt = require('bcrypt');

router
    .post(
      '/',
      [
        check('name', 'Invalid name').exists(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'At least 3 characters').isLength({ min: 3 }),
      ],
      async (req, res) => {

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data for registration'
        })
      }

      const {name, email, password, role} = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      switch (role) {
        case 'driver': {
          try {

            const driverCandidate = await Driver.findOne({ email });

            if (driverCandidate) {
              return res.status(400).json({message: 'Such driver already exists'})
            }

            const driver = await new Driver({
              name,
              email,
              password: hashedPassword,
              role,
            });

            await driver.save();
            res.status(201).json({message: 'Driver was created'});

          } catch (err) {
            res.status(500).json({message: err.message});
          }
          break;
        }
        case 'shipper': {
          try {
            const shipper = await new Shipper({
              name,
              email,
              password: hashedPassword,
              role,
            });

            await shipper.save();
            res.status(201).json({message: 'ShipperProfile was created'});
          } catch (err) {
            res.status(500).json({message: err.message});
          }
          break;
        }
      }
    });

module.exports = router;
