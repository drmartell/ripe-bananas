const chance = require('chance').Chance();
const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');


module.exports = { 
  seed: async({ numReviewers = 10, numStudios = 5, numActors = 50, numFilms = 200, numReviews = 500 } = {}) => {
    await Reviewer.create(Array(numReviewers).fill(() => ({
      name: chance.name(),
      company: `${chance.animal()} Opinions Inc.`
    })));

    const studios = await Studio.create(Array(numStudios).fill(() => ({
      name: `${chance.word()} Studios`,
      address: {
        city: chance.city(),
        state: chance.state(),
        country: chance.country()
      }
    })));
    
    const actors = await Actor.create(Array(numActors).fill(() => ({
      name: chance.name(),
      dob: chance.date(),
      pob: chance.city()
    })));

    const films = await Film.create(Array(numFilms).fill(() => ({
      title: `${chance.name()} ${chance.pickone(['the musical', 'on ice'])}`,
      studio: chance.pickone(studios.map(location => location._id)),
      released: chance.integer({ min: 1880, max: 2020 }),
      cast: [{
        role: chance.word(),
        actor: chance.pickone(actors.map(actor => actor._id)),
      }]
    })));

    const reviews = await Review.create(Array(numReviews).fill(() => ({
      rating: chance.integer({ min: 1, max: 5 }),
      reviewer: chance.pickone(reviews.map(review => review._id)),
      review: chance.string({ length: 140 }),
      film: chance.pickone(films.map(film => film._id)),
    })));
  },
  Actor,
  Film,
  Review,
  Reviewer,
  Studio
};

