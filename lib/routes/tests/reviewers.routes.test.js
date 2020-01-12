const { getReviewer, getReviewers, agents, Reviewer } = require('../../helpers/data-helpers');

/*************/
/* REVIEWERS */
/*************/
describe('reviewers routes', () => {
  it('can save an reviewer to the database', async() => {
    const reviewer = await getReviewer();
    delete reviewer._id;

    await agents.admin
      .post('/api/v1/reviewers')
      .send(reviewer)
      .then(res => expect(res.body).toEqual(expect.objectContaining(reviewer)));
  });

  it('can get a list of all reviewers', async() => {
    const reviewers = await getReviewers();

    await agents.none
      .get('/api/v1/reviewers')
      .then(res => reviewers.forEach(reviewer => {
        delete reviewer.__v;
        expect(res.body)
          .toContainEqual(reviewer);
      }));
  });
  
  it('can get a reviewer by id', async() => {
    const reviewer = await getReviewer();

    await agents.none
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res =>
        expect(res.body)
          .toEqual(expect.objectContaining(reviewer)));
  });
  
  it('can update a reviewer by id', async() => {
    const reviewer = await getReviewer();
    reviewer.name = 'test name';

    await agents.admin
      .put(`/api/v1/reviewers/${reviewer._id}`)
      .send(reviewer)
      .then(res =>
        expect(res.body.name).toEqual('test name'));
  });

  it('it should not delete a reviewer with reviews', async() => {
    const reviewer = await getReviewer();

    await agents.admin
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.text).toEqual('Cannot delete, reviewer has associated reviews.');
        expect(res.body).toEqual({});
      });
  });

  it('it should delete a reviewer without reviews', async() => {
    let reviewer = await Reviewer.create({
      name: 'Deletable Reviewer',
      company: 'Doesn\'t matter'
    });

    reviewer = JSON.parse(JSON.stringify(reviewer));

    await agents.admin
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => expect(res.body).toEqual(reviewer));
  });
});
