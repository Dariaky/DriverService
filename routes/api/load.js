const express = require('express');
const router = express.Router();

const Shipper = require('../../models/Shipper.model');
const Load = require('../../models/Load.model');


router
// /loads/new-loads
    .get('/new-loads', async (req, res) => {

      try {
        const foundNewLoads = await Load.find({
          createdBy: req.headers['userid'],
          status: 'NEW',
        });

        res.status(200).json({foundNewLoads});
      } catch (e) {
        res.status(500).json({status: e.message});
      }
      // here we search for in Load db for all loads from with shipper id with status new
    })

// /loads/create-load
    .post('/create-load', async (req, res) => {
    // form validation
      console.log('Body req: ', req.body);
      // res.status(200).json('good');

      try {
        const newLoad = await new Load({
          title: req.body.title,
          createdBy: req.body.userId,
          assignedTo: '',
          logs: [{message: 'Load created', time: new Date().getTime().toString()}], // might be a problem with time type in model
          status: 'NEW',
          state: '',
          dimensions: {
            width: req.body.width,
            length: req.body.length,
            height: req.body.height,
          },
          payload: req.body.payload,
        });

        await newLoad.save();
        res.status(201).json({message: 'New Load was created'});
      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })

    .get('/:id', async (req, res) => {
      try {
        const load = await Load.findOne({
          _id: req.params.id,
        });

        res.status(200).json({load});

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })
    .delete('/:id', async (req, res) => {
      try {
        await Load.findOneAndRemove({
          _id: req.params.id,
        });

        res.status(200).json({status: 'Load Deleted'});

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })


    .put('/:id', async (req, res) => { // here we receive updated params about load
        try {
          const editedLoad = await Load.findOneAndUpdate(
            {_id: req.params.id},
            {
              title: req.body.title,
              dimensions: {
                width: req.body.width,
                length: req.body.length,
                height: req.body.height
              },
              payload: req.body.payload
            },
            {new: true},
          );

          return res.status(200).json({editedLoad});

        } catch (e) {
          res.status(500).json({status: e.message});
        }
      })

    .patch('/:id', async (req, res) => {
      try {
        console.log(req.params.id);
        const postedLoad = await Load.findOneAndUpdate(
          {_id: req.params.id},
          {status: 'POSTED'},
          {new: true},
        );

        console.log(postedLoad);

        // After this request here or at some point -
        // we loop over Trucks array with status IS and matching loads params with truck params
        // if we find client receives info about truck found
        // truck status changed for OL and Driver and his other trucks become unavailable.
        // findTruck(postedLoad);

        return res.json({status: ' was changed!'});

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    });


// FOR SHIPPERS:
// POST '/:id/create-load'
// GET '/:id/newly-create' to see all new loads ()
// GET '/:id/posted-loads' to see all in progress
// POST '/:id/posted-loads' to see all in progress
// GET '/:id/loads-history' to see all user loads


module.exports = router;
