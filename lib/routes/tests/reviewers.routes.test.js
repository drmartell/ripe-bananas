const { dotenv, request, app, connect, mongoose, getReviewer } = require('../__init-routes'); dotenv.config();

beforeAll(() => connect());
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

/*************/
/* REVIEWERS */
/*************/
describe('reviewers routes', () => {
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
    .then(res => expect(res.body).toContainEqual(savedReviewer)));
  
  it('can get a reviewer by id', () => request(app)
    .get(`/api/v1/reviewers/${savedReviewer._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedReviewer))));
  
  it('can update a reviewer by id', () => request(app)
    .put(`/api/v1/reviewers/${savedReviewer._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedReviewer))));

  it('can delete a reviewer by id', () => request(app)
    .delete(`/api/v1/reviewers/${savedReviewer._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedReviewer))));

  // it('will not delete a reviewer if they have existing reviews', () => request(app)
  //   .put(`/api/v1/reviewers/${savedReviewer._id}`)
  //   .then(res => expect(res.body).toEqual(expect.objectContaining(savedReviewer))));
});
