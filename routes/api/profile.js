const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

//   /profile/:id
router
    .get('/:id', async (req, res) => {

      try {
        if(req.headers['role'] === 'driver') {
          const driver = await Driver.findOne({_id: req.params.id});
          return res.json({
            id: driver.id,
            name: driver.name,
            email: driver.email,
            role: driver.role,
            trucks: driver.trucks
          });
        } else {
          const shipper = await Shipper.findOne({_id: req.params.id});
          return res.json({
            id: shipper.id,
            name: shipper.name,
            email: shipper.email,
            role: shipper.role,
            trucks: shipper.trucks
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
            const updatedDriver = await Driver.findOneAndUpdate(
              {_id: req.params.id},
              {password: hashedPassword},
              {new: true}
              );
        return res.json({updatedDriver});
        } else {
          const updatedShipper = await Shipper.findOneAndUpdate(
            {_id: req.params.id},
            {password: hashedPassword},
            {new: true}
          );
          return res.json({updatedShipper});
        }

      } catch (e) {
        res.status(500).json({status: e.message})
      }
  });


module.exports = router;
