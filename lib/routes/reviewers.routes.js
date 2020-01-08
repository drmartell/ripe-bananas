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

    // const reviewer = await Reviewer.findById(req.params.id);
    // try {
    //   const reviews = await reviewer.getReviews();
    //   if(reviews.length) {
    //     res.send('Cannot delete, there are associated reviews');
    //     //throw new Error('Cannot delete, there are associated reviews');
    //   } else {
    //     const deletedReviewer = await Reviewer.findByIdAndDelete(req.params.id);
    //     res.send(deletedReviewer);
    //   }
    // }
    // catch(err) {
    //   console.log(err); // eslint-disable-line no-console
    //   next(err);
    // }
    
    // Reviewer
    //   .getReviews()
    //   .then(reviews => {
    //     if(reviews) throw new Error('Cannot delete, there are associated reviews');
    //     return Promise.resolve('no reviews');
    //   })
    //   // if there is a review associated, then don't delete
    //   .findByIdAndDelete(req.params.id, { new: false })
    //   .then(deletedReviewer => res.send(deletedReviewer))
    //   .catch(next);
  });
