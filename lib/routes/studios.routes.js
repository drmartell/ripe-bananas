const Studio = require('../models/Studio.model');

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
      .then(studio => studio.addFilms())
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (_req, res, next) => {
    Studio
      .find()
      .select({ name: true })
      .then(studio => res.send(studio))
      .catch(next);
  });
