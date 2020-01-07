require('dotenv').config();
const { request, app, connect, mongoose } = require('./initRoutes');

beforeAll(() => connect());
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

/**********/
/* ACTORS */
/**********/
describe('actor routes', () => {
  const actor = {
    name: 'Johnny English',
    dob: '1970-01-01',
    pob: 'Liverpool'
  };

  let savedActor;
  it('can save an actor to the database', () => request(app)
    .post('/api/v1/actors')
    .send(actor)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining({ ...actor, dob: ('1970-01-01' + 'T00:00:00.000Z') }));
      savedActor = res.body;
    }));

  it('can get a list of all actors', () => request(app)
    .get('/api/v1/actors')
    .then(res => {
      expect(res.body).toContainEqual(savedActor);
    }));
  
  it('can get a actor by id', () => request(app)
    .get(`/api/v1/actors/${savedActor._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(savedActor))));
});
