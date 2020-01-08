require('dotenv').config();
const { seed, Actor, Film, Review, Reviewer, Studio,
  studios, actors, films, reviews } = require('seed');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

beforeAll(() => connect());
beforeEach(async() => {
  await mongoose.connection.dropDatabase();
  await seed();
});
afterAll(() => mongoose.connection.close());

const castToPojo = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Models => {
  const getters = {};
  Models.forEach(model => {
    const modelName = model.modelName;
    const collectionName = model.collections.collectionName;
    if(!collectionName) throw new Error(`Could not retrieve name of MongoDB collection for ${modelName}`);
    getters[`get${modelName}`] = () => model.findOne().then(castToPojo);
    getters[`get${collectionName}`] = () => model.find().then(docs => docs.map(castToPojo));
  });
  return getters;
};

module.exports = {
  ...createGetters([Actor, Film, Review, Reviewer, Studio]),
  studios, actors, films, reviews,
  request: require('supertest'),
  app: require('../lib/app')
};
