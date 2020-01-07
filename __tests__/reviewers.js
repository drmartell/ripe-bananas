require('dotenv').config();
const { request, app, connect, mongoose } = require('./initRoutes');

beforeAll(() => connect());
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

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
