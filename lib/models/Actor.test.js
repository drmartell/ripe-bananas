const Actor = require('./Actor');

describe('Actor Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const actor = new Actor({
        name: null,
        dob: '1900-01-01',
        pob: 'the womb'
      });
      const { errors } = actor.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
});
