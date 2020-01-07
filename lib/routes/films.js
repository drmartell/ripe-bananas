const Film = require('../models/Film');

// {
//   title: <title of film RS>,
//   studio: <studio _id RI>,
//   released: <4-digit year RN>,
//   cast: [{
//     role: <name of character S>,
//     actor: <actor _id RI>
//   }]
// }

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(films => res.send(films))
      .catch(next);
  })

  // return top 100 films
  .get('/', (_req, res, next) => {
    Film
      .find()
      .sort({ rating: 1 })
      .limit(100)
      .then(films => res.send(films))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film
      .findByIdAndDelete(req.params.id, { new: false })
      .then(films => res.send(films))
      .catch(next);
  });
