const Film = require('../models/Film.model');

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

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/', (_req, res, next) => {
    Film
      .find()
      .then(films => res.send(films))
      .catch(next);
  });
