const Reviewer = require('../models/Reviewer');

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (_req, res, next) => {
    Reviewer
      .find()
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
