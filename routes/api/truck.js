const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const contants = require('../../constants/pre-defined-trucks');

const Load = require('../../models/Load.model');
const Truck = require('../../models/Truck.model');


router
    .get('/my-trucks', async (req, res) => {

      try {
        const foundTrucks = await Truck.find({
          createdBy: req.headers['userid']
        });

        res.status(200).json(foundTrucks);
      } catch (e) {
        res.status(500).json({message: e.message});
      }

    })
    .get('/shipments', async (req, res) => {

      try {
        const foundShipments = await Load.find({
          assignedTo: req.headers['userid']
        });

        res.status(200).json(foundShipments);
      } catch (e) {
        res.status(500).json({message: e.message});
      }

    })
    .post('/create-truck', async (req, res) => {

      const schema = Joi.object({
        model: Joi.string()
          .min(2)
          .max(30)
          .required(),
        type: Joi.string()
          .alphanum()
          .required(),
        userId: Joi.string()
          .alphanum()
          .required(),
      });

      try {

        const {model, type, userId} = await schema.validateAsync(req.body);

        let parameters;
        if (type === 'sprinter') {
          parameters = contants.SPRINTER;
        } else if (type === 'small') {
          parameters = contants.SMALL_STRAIGHT;
        } else if (type === 'large') {
          parameters = contants.LARGE_STRAIGHT;
        }

        const newTruck = await new Truck({
          model,
          type,
          createdBy: userId,
          assignedTo: '',
          status: '', // IS OL
          ...parameters
        });

        await newTruck.save();
        res.status(201).json({message: 'New Truck was created'});


      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })

  .get('/:id', async (req, res) => {
    try {
      const truck = await Truck.findOne({
        _id: req.params.id,
      });

      res.status(200).json(truck);

    } catch (e) {
      res.status(500).json({message: e.message});
    }
  })

  .delete('/:id', async (req, res) => {
    try {

      const truck = await Truck.findOne({ _id: req.params.id });

      if(truck.assignedTo !== '') {
        return res.status(400).json({message: 'Cannot delete assigned truck'})
      }

      await Truck.remove({_id: req.params.id,});

      res.status(200).json({message: 'Truck Deleted'});

    } catch (e) {
      res.status(500).json({message: e.message});
    }
  })


  .put('/:id', async (req, res) => {

    const schema = Joi.object({
      model: Joi.string()
        .min(2)
        .max(30)
        .required(),
      type: Joi.string()
        .alphanum()
        .required(),
    });


    try {
      const {model, type} = await schema.validateAsync(req.body);
      const truck = await Truck.findOne({ _id: req.params.id });

      if(truck.assignedTo !== '') {
        return res.status(400).json({message: 'Cannot edit assigned truck'})
      }

      let parameters;
      if (type === 'sprinter') {
        parameters = contants.SPRINTER;
      } else if (type === 'small') {
        parameters = contants.SMALL_STRAIGHT;
      } else if (type === 'large') {
        parameters = contants.LARGE_STRAIGHT;
      }

      const editedTruck = await Truck.findOneAndUpdate(
        {_id: req.params.id},
        {
         model,
         type,
         ...parameters
        },
        {new: true},
      );

      return res.status(200).json(editedTruck);

    } catch (e) {
      res.status(500).json({message: e.message});
    }
  })

  // assign logic
  .patch('/:id/assign', async (req, res) => {
    try {

      const anyAssigned = await Truck.findOne( {status: 'OL'} );

      if (anyAssigned) {
        return res.status(400).json({message: 'You cannot assign another truck unit you deliver the load'});
      }

      // re-assign all trucks
      await Truck.findOneAndUpdate({assignedTo: req.body.userId},
        {
          assignedTo: '',
          status: '',
        });

      const assignedTruck = await Truck.updateOne(
        {_id: req.params.id},
        {
          assignedTo: req.body.userId,
          status: 'IS'
        },
        {new: true},
      );

      return res.json(assignedTruck);

    } catch (e) {
      res.status(500).json({message: e.message});
    }
  })
  .patch('/:id/reassign', async (req, res) => {
    try {

      const match = await Truck.findOne( {_id: req.params.id} );

      if (match.status === 'OL') {
        return res.status(400).json({message: 'You cannot be reassigned until you deliver the load'});
      }

      await Truck.updateOne(
        {_id: req.params.id},
        {
          assignedTo: '',
          status: 'IS'
        },
        {new: true},
      );

      return res.status(200).json({message: 'Truck was reassigned'});

    } catch (e) {
      res.status(500).json({message: e.message});
    }
  });

module.exports = router;
