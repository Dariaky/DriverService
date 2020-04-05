const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

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
        res.status(500).json({message: e.message});
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
      res.status(500).json({message: e.message});
    }

  })

// /loads/create-load
    .post('/create-load', async (req, res) => {

      const schema = Joi.object({
        title: Joi.string()
          .min(2)
          .max(30)
          .required(),
        width: Joi.number()
          .required(),
        length: Joi.number()
          .required(),
        height: Joi.number()
          .required(),
        payload: Joi.number()
          .required(),
        userId: Joi.string()
          .alphanum()
          .required(),
      });

      try {

        const {title, width, length, height, payload, userId} = await schema.validateAsync(req.body);

        const newLoad = await new Load({
          title,
          createdBy: userId,
          assignedTo: '',
          logs: [{message: 'Load created', time: new Date().getTime().toString()}],
          status: 'NEW',
          state: '',
          dimensions: {
            width,
            length,
            height,
          },
          payload,
        });

        await newLoad.save();
        res.status(201).json({message: 'Load was created!'});
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    .get('/:id', async (req, res) => {
      try {
        const load = await Load.findOne({
          _id: req.params.id,
        });

        res.status(200).json(load);

      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    .delete('/:id', async (req, res) => {
      try {
        await Load.findOneAndRemove({
          _id: req.params.id,
        });

        res.status(200).json({message: 'Load Deleted'});

      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })

    .put('/:id', async (req, res) => {

      const schema = Joi.object({
        title: Joi.string()
          .min(2)
          .max(30)
          .required(),
        width: Joi.number()
          .required(),
        length: Joi.number()
          .required(),
        height: Joi.number()
          .required(),
        payload: Joi.number()
          .required(),
      });


      try {

        const {title, width, length, height, payload} = await schema.validateAsync(req.body);

        console.log('WIDTH FROM VALIDATION:', typeof width);
          const editedLoad = await Load.findOneAndUpdate(
            {_id: req.params.id},
            {
              title,
              dimensions: {
                width,
                length,
                height
              },
              payload
            },
            {new: true},
          );

          return res.status(200).json(editedLoad);

        } catch (e) {
          res.status(500).json({message: e.message});
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
        res.status(500).json({message: e.message});
      }
    });


module.exports = router;
