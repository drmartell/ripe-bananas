const { dotenv, request, app, connect, mongoose, getReviewer } = require('../../__tests__/init-routes'); dotenv();

beforeAll(() => connect());
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

/*************/
/* REVIEWERS */
/*************/
describe('reviewer routes', () => {
  const reviewer = getReviewer();
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
