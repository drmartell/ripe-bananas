const { dotenv, request, app, connect, mongoose, getFilm, getActor, getStudio } = require('../__init-routes'); dotenv.config();
const Actor =  require('../../models/Actor.model');
const Studio =  require('../../models/Studio.model');

let film;
let actor;
let studio;
beforeAll(async() => {
  connect();
  actor = await Actor.create(getActor());
  studio = await Studio.create(getStudio());
  film = getFilm();
  film.studio = studio._id;
  film.cast.push({
    role: 'Test Role',
    actor: actor._id
  });
});
//actor = await Actor.create(getActor()) );
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

/**********/
/* FILMS */
/**********/
describe('film routes', () => {
  let savedFilm;
  it('can save an film to the database', () => {
    return request(app)
      .post('/api/v1/films')
      .send(film)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({ title: film.title }));
        savedFilm = res.body;
      });
  });

  it('can get a list of all films', () => request(app)
    .get('/api/v1/films')
    .then(res => {
      expect(res.body).toContainEqual(savedFilm);
    }));
  
  it('can get a film by id', () => request(app)
    .get(`/api/v1/films/${savedFilm._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedFilm))));
});
