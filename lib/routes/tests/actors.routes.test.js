//const { dotenv, request, app, connect, mongoose, getActor } = require('../__init-routes'); dotenv.config();
const { getActor, getActors, request, app } = require('../../helpers/data-helpers');

/**********/
/* ACTORS */
/**********/
describe('actor routes', () => {
  // get an actor from the database
  const actor = getActor();
  it('can save an actor to the database', () => request(app)
    .post('/api/v1/actors')
    .send(actor)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining(actor));
    }));

  it('can get a list of all actors via GET', () => request(app)
    .get('/api/v1/actors')
    .then(res => {
      actor.forEach(actor => expect(res.body).toContainEqual(actor));
    }));
  
  it('can get a actor by id via GET', () => request(app)
    .get(`/api/v1/actors/${actor._id}`)
    .then(res =>
      expect(res.body).toEqual(expect.objectContaining(actor))));
});
