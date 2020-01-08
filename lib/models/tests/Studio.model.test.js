const Studio = require('../Studio.model');

describe('Studio Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const studio = new Studio({
        name: null,
        address: {
          city: 'Warner City',
          state: 'CA',
          country: 'USA'
        } });
      const { errors } = studio.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
});
