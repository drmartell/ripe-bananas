const Review = require('./Review.model');

// {
//   rating: <rating number 1-5 RN>,
//   reviewer: <review _id RI>
//   review: <review-text, max-length 140 chars RS>,
//   film: <film-id RI>
// }

const objectId = require('mongoose').Types.ObjectId();
const review = {
  rating: 5,
  reviewer: objectId,
  review: 'An Amazing Film',
  film: objectId
};

describe('Review Model', () => {
  describe('rating', () => {
    it('requires a rating', () => {
      let testReview = review;
      delete testReview.rating;
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.rating.message).toEqual('Path `rating` is required.');
    });
    it('requires a rating > 0', () => {
      let testReview = review;
      testReview.rating = -1;
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.rating.message).toEqual('Path `rating` (-1) is less than minimum allowed value (1).');
    });
    it('requires a rating < 5', () => {
      let testReview = review;
      testReview.rating = 6;
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
    });
  });
  describe('reviewer', () => {
    it('requires a reviewer', () => {
      let testReview = review;
      delete testReview.reviewer;
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
    });
  });
  describe('review', () => {
    it('requires a review', () => {
      let testReview = review;
      delete testReview.review;
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.review.message).toEqual('Path `review` is required.');
    });
    it('requires a review length not exceeding 140 characters', () => {
      let testReview = review;
      testReview.review = ' '.repeat(141);
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.review.message).toEqual('Path `review` (`                                                                                                                                             `) is longer than the maximum allowed length (140).');
    });
  });
  describe('film', () => {
    it('requires a film', () => {
      let testReview = review;
      delete testReview.film;
      testReview = new Review(testReview);
      const { errors } = testReview.validateSync();
      expect(errors.film.message).toEqual('Path `film` is required.');
    });
  });
});
