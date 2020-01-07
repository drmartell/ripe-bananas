const Actor = require('../models/Actor.model');

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', (_req, res, next) => {
    Actor
      .find()
      .then(actor => res.send(actor))
      .catch(next);
  });
