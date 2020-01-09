const { getStudio, getStudios, request, app } = require('../../helpers/data-helpers');

/***********/
/* STUDIOS */
/***********/
describe('studio routes', () => {
  it('can save an studio to the database', async() => {
    const studio = await getStudio();
    delete studio._id;
    
    return request(app)
      .post('/api/v1/studios')
      .send(studio)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining(studio));
      });
  });

  it('can get a list of all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          delete studio.__v;
          delete studio.address;
          expect(res.body).toContainEqual(studio);
        });
      });
  });
  
  it('can get a studio by id', async() => {
    const studio = await getStudio();

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res =>
        expect(res.body)
          .toEqual(expect.objectContaining({ _id: studio._id })));
  });
});
