module.exports = {
  dotenv: require('dotenv').config(),
  request: require('supertest'),
  app: require('../lib/app'),
  connect: require('../lib/utils/connect'),
  mongoose: require('mongoose'),
  getStudio: () => ({
    name: 'Warner Bros',
    address: {
      city: 'Warner Street',
      state: 'CA',
      country: 'USA'
    }
  }),
  getReviewer: () => ({
    name: 'Some Name',
    company: 'Some Company'
  }),
  getReview: () => ({
    rating: 5,
    reviewer: this.mongoose.Types.ObjectId(),
    review: 'What an amazing film.',
    film: this.mongoose.Types.ObjectId()
  })
};
