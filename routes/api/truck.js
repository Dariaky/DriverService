const express = require('express');
const router = express.Router();
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
        res.status(500).json({status: e.message});
      }
      // here we search for in Load db for all loads from with shipper id with status new
    })
    .get('/shipments', async (req, res) => {

      try {
        const foundShipments = await Load.find({
          assignedTo: req.headers['userid']
        });

        res.status(200).json(foundShipments);
      } catch (e) {
        res.status(500).json({status: e.message});
      }

    })


    .post('/create-truck', async (req, res) => {

      try {

        let parameters;
        if (req.body.type === 'sprinter') {
          parameters = contants.SPRINTER;
        } else if (req.body.type === 'small') {
          parameters = contants.SMALL_STRAIGHT;
        } else if (req.body.type === 'large') {
          parameters = contants.LARGE_STRAIGHT;
        }

        const newTruck = await new Truck({
          model: req.body.model,
          type: req.body.type,
          createdBy: req.body.userId,
          assignedTo: '',
          status: '', // IS OL
          ...parameters
        });

        await newTruck.save();
        res.status(201).json({message: 'New Truck was created'});


      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })

  .get('/:id', async (req, res) => {
    try {
      const truck = await Truck.findOne({
        _id: req.params.id,
      });

      res.status(200).json(truck);

    } catch (e) {
      res.status(500).json({status: e.message});
    }
  })

  .delete('/:id', async (req, res) => {
    try {

      const truck = await Truck.findOne({ _id: req.params.id });

      if(truck.assignedTo !== '') {
        return res.status(400).json({status: 'Cannot delete assigned truck'})
      }

      await Truck.remove({_id: req.params.id,});

      res.status(200).json({status: 'Truck Deleted'});

    } catch (e) {
      res.status(500).json({status: e.message});
    }
  })


  .put('/:id', async (req, res) => {
    try {

      const truck = await Truck.findOne({ _id: req.params.id });

      if(truck.assignedTo !== '') {
        return res.status(400).json({status: 'Cannot edit assigned truck'})
      }

      let parameters;
      if (req.body.type === 'sprinter') {
        parameters = contants.SPRINTER;
      } else if (req.body.type === 'small') {
        parameters = contants.SMALL_STRAIGHT;
      } else if (req.body.type === 'large') {
        parameters = contants.LARGE_STRAIGHT;
      }

      const editedTruck = await Truck.findOneAndUpdate(
        {_id: req.params.id},
        {
         model: req.body.model,
         type: req.body.type,
         ...parameters
        },
        {new: true},
      );

      return res.status(200).json(editedTruck);

    } catch (e) {
      res.status(500).json({status: e.message});
    }
  })

  // assign logic
  // if driver chooses truck: truck status - IS, truck assignTo - driver's id!!!!

  .patch('/:id/assign', async (req, res) => {
    try {

      const anyAssigned = await Truck.findOne( {status: 'OL'} );

      if (anyAssigned) {
        return res.status(400).json({status: 'You cannot assign another truck unit you deliver the load'});
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
      res.status(500).json({status: e.message});
    }
  })
  .patch('/:id/reassign', async (req, res) => {
    try {

      const match = await Truck.findOne( {_id: req.params.id} );

      if (match.status === 'OL') {
        return res.status(400).json({status: 'You cannot be reassigned until you deliver the load'});
      }

      await Truck.updateOne(
        {_id: req.params.id},
        {
          assignedTo: '',
          status: 'IS'
        },
        {new: true},
      );

      return res.status(200).json({status: 'Truck was reassigned'});

    } catch (e) {
      res.status(500).json({status: e.message});
    }
  });

module.exports = router;
