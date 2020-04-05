const express = require('express');
const router = express.Router();

const Load = require('../../models/Load.model');

const findTruck = require('../../service/search.service');

router
// /loads/new-loads
    .get('/new-loads', async (req, res) => {

      try {
        const foundNewLoads = await Load.find({
          createdBy: req.headers['userid'],
          status: 'NEW',
        });

        res.status(200).json(foundNewLoads);
      } catch (e) {
        res.status(500).json({status: e.message});
      }

    })
  .get('/shipments', async (req, res) => {

    try {
      const foundLoads = await Load.find({
        createdBy: req.headers['userid'],
        status: 'ASSIGNED',
      });

      res.status(200).json(foundLoads);
    } catch (e) {
      res.status(500).json({status: e.message});
    }

  })

// /loads/create-load
    .post('/create-load', async (req, res) => {
    // form validation

      try {
        const newLoad = await new Load({
          title: req.body.title,
          createdBy: req.body.userId,
          assignedTo: '',
          logs: [{message: 'Load created', time: new Date().getTime().toString()}],
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

        res.status(200).json(load);

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

    .put('/:id', async (req, res) => {
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

          return res.status(200).json(editedLoad);

        } catch (e) {
          res.status(500).json({status: e.message});
        }
      })

    .patch('/:id', async (req, res) => {
      try {
        const postedLoad = await Load.findOneAndUpdate(
          {_id: req.params.id},
          {status: 'POSTED'},
          {new: true},
        );

        const result = await findTruck(postedLoad);

        return res.status(200).json(result);

      } catch (e) {
        res.status(500).json({status: e.message});
      }
    });


module.exports = router;
