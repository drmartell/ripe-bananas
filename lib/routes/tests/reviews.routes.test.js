const { agents, getReview } = require('../../helpers/data-helpers');

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
  it('can save an review to the database', async() => {
    const review = await getReview();
    delete review._id;
    
    await agents.reviewer
      .post('/api/v1/reviews')
      .send(review)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(review));
      });
  });

  it('can get a list of the top 100 reviews', async() =>
    await agents.none
      .get('/api/v1/reviews')
      .then(res =>
        expect(res.body).toHaveLength(100))
  );

  it('can get a review by id via GET', async() => {
    const review = await getReview();
  
    await agents.none
      .get(`/api/v1/reviews/${review._id}`)
      .then(res =>
        expect(res.body)
          .toEqual(expect.objectContaining(review)));
  });
});
