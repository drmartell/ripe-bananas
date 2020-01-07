require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

beforeAll(() => connect());
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

/***********/
/* STUDIOS */
/***********/
describe('studio routes', () => {
  const studio = {
    name: 'Warner Bros',
    address: {
      city: 'Warner Street',
      state: 'CA',
      country: 'USA'
    }
  };

  let savedStudio;
  it('can save a studio to the database', () => request(app)
    .post('/api/v1/studios')
    .send(studio)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining(studio));
      savedStudio = res.body;
    }));

  it('can get a list of all studios', () => request(app)
    .get('/api/v1/studios')
    .then(res => {
      expect(res.body).toContainEqual(savedStudio);
    }));
  
  it('can get a studio by id', () => request(app)
    .get(`/api/v1/studios/${savedStudio._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(studio))));
});

/**********/
/* ACTORS */
/**********/
describe('actor routes', () => {
  const actor = {
    name: 'Johnny English',
    dob: '1970-01-01',
    pob: 'Liverpool'
  };

  let savedActor;
  it('can save an actor to the database', () => request(app)
    .post('/api/v1/actors')
    .send(actor)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining({ ...actor, dob: ('1970-01-01' + 'T00:00:00.000Z') }));
      savedActor = res.body;
    }));

  it('can get a list of all actors', () => request(app)
    .get('/api/v1/actors')
    .then(res => {
      expect(res.body).toContainEqual(savedActor);
    }));
  
  it('can get a actor by id', () => request(app)
    .get(`/api/v1/actors/${savedActor._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedActor))));
});

/*************/
/* REVIEWERS */
/*************/
describe('reviewer routes', () => {
  const reviewer = {
    name: 'Some Name',
    company: 'Some Company'
  };

  let savedReviewer;
  it('can save an reviewer to the database', () => request(app)
    .post('/api/v1/reviewers')
    .send(reviewer)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining(reviewer));
      savedReviewer = res.body;
    }));

  it('can get a list of all reviewers', () => request(app)
    .get('/api/v1/reviewers')
    .then(res => {
      expect(res.body).toContainEqual(savedReviewer);
    }));
  
  it('can get a reviewer by id', () => request(app)
    .get(`/api/v1/reviewers/${savedReviewer._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedReviewer))));
});

/***********/
/* REVIEWS */
/***********/
// {
//   rating: <rating number 1-5 RN>,
//   reviewer: <review _id RI>
//   review: <review-text, max-length 140 chars RS>,
//   film: <film-id RI>
// }
describe('review routes', () => {
  // const review = {
  //   // rating: 5,
  //   // reviewer: <review _id RI>
  //   // review: <review-text, max-length 140 chars RS>,
  //   // film: <film-id RI>
  // };

  let savedReviewer;
  it('can save an reviewer to the database', () => request(app)
    .post('/api/v1/reviewers')
    .send(reviewer)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining(reviewer));
      savedReviewer = res.body;
    }));

  it('can get a list of all reviewers', () => request(app)
    .get('/api/v1/reviewers')
    .then(res => {
      expect(res.body).toContainEqual(savedReviewer);
    }));
  
  it('can get a reviewer by id', () => request(app)
    .get(`/api/v1/reviewers/${savedReviewer._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedReviewer))));
});
