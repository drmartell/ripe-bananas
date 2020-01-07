const Reviewer = require('./Reviewer.model');

// {
//   name: <string RS>,
//   company: <company or website name RS>
// }

describe('Reviewer Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const reviewer = new Reviewer({
        name: null,
        company: 'Some Company'
      });
      const { errors } = reviewer.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
  describe('company', () => {
    it('requires a company or website', () => {
      const reviewer = new Reviewer({
        name: 'Some Name',
        company: null
      });
      const { errors } = reviewer.validateSync();
      expect(errors.company.message).toEqual('Path `company` is required.');
    });
  });
});
