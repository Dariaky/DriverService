const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const authorizationService = require('../../service/auth.service');

const bcrypt = require('bcrypt');


router
    .post(
      '/',
      [
        check('email', 'Invalid email').isEmail(),
        check('password', 'At least 3 characters').isLength({ min: 3 }),
      ],
      async (req, res) => {

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data for login'
        })
      }

      const { email, password, role} = req.body;

      switch (role) {
        case 'driver': {
          try {
            const driver = await Driver.findOne({ email });

            if (!driver) {
              return res.status(400).json({ message: 'No such driver' });
            }

            const isMatch = await bcrypt.compare(password, driver.password);

            if(!isMatch) {
              return res.status(400).json({ message: 'Invalid password' })
            }

            // Creating jwt token
            const jwtToken = await authorizationService
              .createToken(driver, {});
            res.status(200).json({
              jwtToken,
              userId: driver.id,
              role: driver.role,
            });

          } catch (err) {
            res.status(500).json({status: err.message});
          }
          break;
        }
        case 'shipper': {
          try {
            const shipper = await Shipper.findOne({ email });

            if (!shipper) {
              return res.status(400).json({ message: 'No such shipper' });
            }

            const isMatch = await bcrypt.compare(password, shipper.password);

            if(!isMatch) {
              return res.status(400).json({ message: 'Invalid password' })
            }

            // Creating jwt token
            const jwtToken = await authorizationService
              .createToken(shipper, {});
            res.status(200).json({
              jwtToken,
              userId: shipper.id,
              userName: shipper.name,
              role: shipper.role,
            });

          } catch (err) {
            res.status(500).json({status: err.message});
          }
          break;
        }
      }
    }
    );


module.exports = router;
