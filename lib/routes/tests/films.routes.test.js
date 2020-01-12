const { getFilm, getFilms, agents } = require('../../helpers/data-helpers');

/**********/
/* FILMS */
/**********/
describe('film routes', () => {
  it('can save an film to the database', async() => {
    const film = await getFilm();
    delete film._id;

    await agents.admin
      .post('/api/v1/films')
      .send(film)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(film));
      });
  });

  it('can get a list of all films', async() => {
    const films = await getFilms();

    await agents.none
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => expect(res.body)
          .toContainEqual(film));
      });
  });
  
  it('can get a film by id', async() => {
    const film = await getFilm();

    await agents.none
      .get(`/api/v1/films/${film._id}`)
      .then(res =>
        expect(res.body)
          .toEqual(expect.objectContaining({ _id: film._id })));
  });
});
