
const { dotenv, request, app, connect, mongoose, getStudio } = require('./__init-routes'); dotenv.config();

beforeAll(() => connect());
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

/***********/
/* STUDIOS */
/***********/
describe('studio routes', () => {
  const studio = getStudio();
  let savedStudio;
  it('can save a studio to the database', () => request(app)
    .post('/api/v1/studios')
    .send(studio)
    .then(res => {
      expect(res.body).toEqual(expect.objectContaining(studio));
      savedStudio = res.body;
    }));

  it('can get a list of all studios', () => request(app)
    .get('/api/v1/studios')
    .then(res => {
      expect(res.body).toContainEqual(savedStudio);
    }));
  
  it('can get a studio by id', () => request(app)
    .get(`/api/v1/studios/${savedStudio._id}`)
    .then(res => expect(res.body).toEqual(expect.objectContaining(studio))));
});
