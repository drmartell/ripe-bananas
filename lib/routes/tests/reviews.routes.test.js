const { dotenv, request, app, connect, mongoose, getReviews } = require('../__init-routes'); dotenv.config();

beforeAll(async() => {
  connect();
  new Review()
});
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

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
  const review = getReviews()[0];
  let savedReview;
  it('can save an review to the database', () => request(app)
    .post('/api/v1/reviews')
    .send(review)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining(review));
      savedReview = res.body;
    }));

  it('can get a list of the top n reviews', () => request(app)
    .get('/api/v1/reviews')
    .sort()
    .limit(2)
    .then(res => {
      expect(res.body).toContainEqual(savedReview);
    }));
  
  it.skip('can get a review by id', () => request(app)
    .get(`/api/v1/reviews/${savedReview._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedReview))));
});
