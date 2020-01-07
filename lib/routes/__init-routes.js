module.exports = {
  dotenv: require('dotenv'),
  request: require('supertest'),
  app: require('../app'),
  connect: require('../utils/connect'),
  mongoose: require('mongoose'),
  
  Actor: require('../models/Actor.model'),
  Film: require('../models/Film.model'),
  Reviewer: require('../models/Reviewer.model'),
  Review: require('../models/Review.model'),
  Studio: require('../models/Studio.model'),

  getStudio: () => ({
    name: 'Warner Bros',
    address: {
      city: 'Warner City',
      state: 'CA',
      country: 'USA'
    }
  }),

  getReviewer: () => ({
    name: 'Some Name',
    company: 'Some Company'
  }),

  getReviews: () => ([{
    rating: 5,
    reviewer: require('mongoose').Types.ObjectId(),
    review: 'Review #1',
    film: require('mongoose').Types.ObjectId()
  },
  {
    rating: 4,
    reviewer: require('mongoose').Types.ObjectId(),
    review: 'Review #2',
    film: require('mongoose').Types.ObjectId()
  },
  {
    rating: 4,
    reviewer: require('mongoose').Types.ObjectId(),
    review: 'Review #3',
    film: require('mongoose').Types.ObjectId()
  }
  ]),
  
  getActor: () => ({
    name: 'Johnny English',
    dob: '1970-01-01',
    pob: 'Liverpool'
  })
};
