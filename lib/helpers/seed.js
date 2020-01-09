const chance = require('chance').Chance();
const Actor = require('../models/Actor.model');
const Film = require('../models/Film.model');
const Review = require('../models/Review.model');
const Reviewer = require('../models/Reviewer.model');
const Studio = require('../models/Studio.model');


module.exports = { 
  seed: async({ numReviewers = 10, numStudios = 5, numActors = 50, numFilms = 200, numReviews = 500 } = {}) => {
    const reviewers = await Reviewer.create([...Array(numReviewers)].map(() => ({
      name: chance.name(),
      company: `${chance.animal()} Opinions Inc.`
    })));
    
    const actors = await Actor.create([...Array(numActors)].map(() => ({
      name: chance.name(),
      dob: chance.date(),
      pob: chance.city()
    })));

    const studios = await Studio.create([...Array(numStudios)].map(() => ({
      name: `${chance.word()} Studios`,
      address: {
        city: chance.city(),
        state: chance.state(),
        country: chance.country()
      }
    })));

    const films = await Film.create([...Array(numFilms)].map(() => ({
      title: `${chance.name()} ${chance.pickone(['the musical', 'on ice'])}`,
      studio: chance.pickone(studios.map(location => location._id)),
      released: chance.integer({ min: 1880, max: 2020 }),
      cast: [{
        role: chance.word(),
        actor: chance.pickone(actors.map(actor => actor._id)),
      }]
    })));

    await Review.create([...Array(numReviews)].map(() => ({
      rating: chance.integer({ min: 1, max: 5 }),
      reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
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

