const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const authorizationService = require('../../service/auth.service');

const bcrypt = require('bcrypt');


router
    .post(
        '/',
        [
          check('email', 'Invalid email').isEmail(),
          check('password', 'At least 3 characters').isLength({min: 3}),
        ],
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
              message: 'Invalid data for login',
            });
          }

          const {email, password, role} = req.body;
          try {
            let user;
            if (role === 'driver') {
              user = await Driver.findOne({email});
            } else {
              user = await Shipper.findOne({email});
            }

            if (!user) {
              return res.status(400).json({message: 'No such user'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
              return res.status(400).json({message: 'Invalid password'});
            }

            const jwtToken = await authorizationService
                .createToken(user, {});
            res.status(200).json({
              jwtToken,
              userId: user.id,
              role: user.role,
            });
          } catch (err) {
            res.status(500).json({status: err.message});
          }
        },
    );


module.exports = router;
