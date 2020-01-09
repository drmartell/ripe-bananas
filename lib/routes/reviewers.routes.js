const Reviewer = require('../models/Reviewer.model');

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
      .then(reviewer => reviewer.addReviews())
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (_req, res, next) => {
    Reviewer
      .find()
      .select({ name: true, company: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedReviewer => res.send(updatedReviewer))
      .catch(next);
  })

  .delete('/:id', async(req, res, next) => {
    Reviewer
      .deleteByIdIfNoReviews(req.params.id)
      .then(deletedReviewer => res.send(deletedReviewer))
      .catch(next);
  });
