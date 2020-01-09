const { getFilm, getFilms, request, app } = require('../../helpers/data-helpers');

/**********/
/* FILMS */
/**********/
describe('film routes', () => {
  it('can save an film to the database', async() => {
    const film = await getFilm();
    delete film._id;

    return request(app)
      .post('/api/v1/films')
      .send(film)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(film));
      });
  });

  it('can get a list of all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => expect(res.body)
          .toContainEqual(film));
      });
  });
  
  it('can get a film by id', async() => {
    const film = await getFilm();

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res =>
        expect(res.body)
          .toEqual(expect.objectContaining({ _id: film._id })));
  });
});
