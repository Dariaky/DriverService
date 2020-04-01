const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const bcrypt = require('bcrypt');

router
    .post(
        '/',
        [
          check('name', 'Invalid name').exists(),
          check('email', 'Invalid email').isEmail(),
          check('password', 'At least 3 characters').isLength({min: 3}),
        ],
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
              message: 'Invalid data for registration',
            });
          }

          const {name, email, password, role} = req.body;

          try {
            let userCandidate;
            if (role === 'driver') {
              userCandidate = await Driver.findOne({email});
            } else {
              userCandidate = await Shipper.findOne({email});
            }

            if (userCandidate) {
              return res.status(400).json({message: 'Such user already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            let user;
            if (role === 'driver') {
              user = await new Driver({
                name,
                email,
                password: hashedPassword,
                role,
              });
            } else {
              user = await new Shipper({
                name,
                email,
                password: hashedPassword,
                role,
              });
            }

            await user.save();
            res.status(201).json({message: 'User was created'});
          } catch (err) {
            res.status(500).json({message: err.message});
          }
        });

module.exports = router;
