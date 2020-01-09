const Review = require('../models/Review.model');

// {
//   rating: <rating number 1-5 RN>,
//   reviewer: <review _id RI>
//   review: <review-text, max-length 140 chars RS>,
//   film: <film-id RI>
// }

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  // return top 100 reviews
  .get('/', (_req, res, next) => {
    Review
      .find()
      .sort({ rating: 1 })
      .limit(100)
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });
// .delete('/:id', (req, res, next) => {
//   Review
//     .findByIdAndRemove(req.params.id, { new: false })
//     .then(reviews => res.send(reviews))
//     .catch(next);
// });
