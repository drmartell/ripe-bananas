//const { dotenv, request, app, connect, mongoose, getActor } = require('../__init-routes'); dotenv.config();
const { getActor, getActors, request, app } = require('../../helpers/data-helpers');

/**********/
/* ACTORS */
/**********/
describe('actor routes', () => {
  it('can save an actor to the database', async() => {
    const actor = await getActor();
    delete actor._id;

    return request(app)
      .post('/api/v1/actors')
      .send(actor)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(actor));
      });
  });

  it('can get a list of all actors via GET', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => expect(res.body)
          .toContainEqual({ _id: actor._id, name: actor.name }));
      });
  });
  
  it('can get a actor by id via GET', async() => {
    const actor = await getActor();

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res =>
        expect(res.body)
          .toEqual(expect.objectContaining(actor)));
  });
});
