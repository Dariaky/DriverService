const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

//   /profile/:id
router
    .get('/:id', async (req, res) => {
      try {
        if (req.headers['role'] === 'driver') {
          const driver = await Driver.findOne({_id: req.params.id});
          return res.json({
            id: driver.id,
            name: driver.name,
            email: driver.email,
            role: driver.role,
            trucks: driver.trucks,
          });
        } else {
          const shipper = await Shipper.findOne({_id: req.params.id});
          return res.json({
            id: shipper.id,
            name: shipper.name,
            email: shipper.email,
            role: shipper.role,
            trucks: shipper.trucks,
          });
        }
      } catch (err) {
        res.send('Cannot find user');
      }
    })

    .put('/:id/change-password', async (req, res) => {
      // oldPassword
      // newPassword
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
      try {
        if (req.body.role === 'driver') {
          await Driver.findOneAndUpdate(
              {_id: req.params.id},
              {password: hashedPassword},
              {new: true},
          );
          return res.json({status: 'Password was changed!'});
        } else {
          await Shipper.findOneAndUpdate(
              {_id: req.params.id},
              {password: hashedPassword},
              {new: true},
          );
          return res.json({status: 'Password was changed!'});
        }
      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })

    .delete('/:id/delete-account', async (req, res) => {
      try {
        await Shipper.findOneAndRemove({
          _id: req.params.id,
          email: req.body.email,
        });
        res.status(200).json({status: 'User was deleted!'});
      } catch (err) {
        res.status(401).json({status: err.message});
      }
    });


// FOR SHIPPERS:
// GET '/:id/newly-create' to see all new loads ()
// GET '/:id/posted-loads' to see all in progress
// GET '/:id/loads-history' to see all user loads

// FOR DRIVER:

module.exports = router;
