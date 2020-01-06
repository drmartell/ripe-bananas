const Studio = require('../models/Studio');

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (_req, res, next) => {
    Studio
      .find()
      .then(studio => res.send(studio))
      .catch(next);
  });
