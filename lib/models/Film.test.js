const Film = require('./Film');

// {
//   title: <title of film RS>,
//   studio: <studio _id RI>,
//   released: <4-digit year RN>,
//   cast: [{
//     role: <name of character S>,
//     actor: <actor _id RI>
//   }]
// }

const objectId = require('mongoose').Types.ObjectId();
const film = {
  title: 'The Title',
  studio: objectId,
  released: 1234,
  cast: [{
    role: 'Character Name',
    actor: objectId
  }]
};

describe('Film Model', () => {
  describe('title', () => {
    it('requires a title', () => {
      let testFilm = film;
      delete testFilm.title;
      testFilm = new Film(testFilm);
      const { errors } = testFilm.validateSync();
      expect(errors.title.message).toEqual('Path `title` is required.');
    });
    it('requires a studio id', () => {
      let testFilm = film;
      delete testFilm.studio;
      testFilm = new Film(testFilm);
      const { errors } = testFilm.validateSync();
      expect(errors.studio.message).toEqual('Path `studio` is required.');
    });
    it('requires a year released', () => {
      let testFilm = film;
      delete testFilm.released;
      testFilm = new Film(testFilm);
      const { errors } = testFilm.validateSync();
      expect(errors.released.message).toEqual('Path `released` is required.');
    });
    it('requires a year released > 999', () => {
      let testFilm = film;
      testFilm.released = 999;
      testFilm = new Film(testFilm);
      const { errors } = testFilm.validateSync();
      expect(errors.released.message).toEqual('Path `released` (999) is less than minimum allowed value (1000).');
    });
    it('requires a year released < 10000', () => {
      let testFilm = film;
      testFilm.released = 10000;
      testFilm = new Film(testFilm);
      const { errors } = testFilm.validateSync();
      expect(errors.released.message).toEqual('Path `released` (10000) is more than maximum allowed value (9999).');
    });
    it('requires an actor id', () => {
      let testFilm = film;
      delete testFilm.cast[0].actor;
      testFilm = new Film(testFilm);
      const { errors } = testFilm.validateSync();
      expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
    });
  });
});
