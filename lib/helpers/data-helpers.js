require('dotenv').config();
const
  {
    seed, Actor, Film, Review, Reviewer, Studio, User,
    studios, actors, films, reviews
  } = require('./seed'),
  connect = require('../utils/connect'),
  mongoose = require('mongoose'),
  request = require('supertest'),
  app = require('../app');

let
  adminAgent = request.agent(app),
  userAgent = request.agent(app),
  reviewerAgent = request.agent(app),
  password = 'password';
  
beforeAll(() => connect());

beforeEach(async() => {
  await mongoose.connection.dropDatabase();
  await seed();

  const createUser = User.create({
    email: 'testUser@test.com',
    password: 'password',
    role: 'user'
  }).then(user => userAgent
    .post('/api/v1/auth/login')
    .send({ email: user.email, password }));

  const createAdmin = User.create({
    email: 'testAdmin@test.com',
    password: 'password',
    role: 'admin'
  }).then(user => adminAgent
    .post('/api/v1/auth/login')
    .send({ email: user.email, password }));

  const createReviewer = User.create({
    email: 'testReviewer@test.com',
    password: 'password',
    role: 'reviewer'
  }).then(user => reviewerAgent
    .post('/api/v1/auth/login')
    .send({ email: user.email, password }));

  await Promise.all([createUser, createAdmin, createReviewer]);
});

afterAll(() => mongoose.connection.close());

const castToPojo = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Models => {
  const getters = {};
  Models.forEach(model => {
    const modelName = model.modelName;
    const collectionName = model.collection.collectionName;

    if(!collectionName) throw new Error(`Could not retrieve name of MongoDB collection for ${modelName}`);
    getters[`get${modelName}`] = () => model.findOne().then(castToPojo);

    const collectionNameCapitalized = collectionName.charAt(0).toUpperCase() + collectionName.substring(1);
    getters[`get${collectionNameCapitalized}`] = () => model.find().then(docs => docs.map(castToPojo));
  });
  return getters;
};

module.exports = {
  ...createGetters([Actor, Film, Review, Reviewer, Studio]),
  Actor, Film, Review, Reviewer, Studio,
  studios, actors, films, reviews,
  request, app,
  userAgent, reviewerAgent, adminAgent
};
