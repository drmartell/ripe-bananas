const User = require('../User.model');

describe('User Model', () => {
  describe('email', () => {
    it('requires an email', () => {
      const user = new User({
        email: null,
        passwordHash: 'abcdefg',
        role: 'user'
      });
      const { errors } = user.validateSync();
      expect(errors.email.message).toEqual('Path `email` is required.');
    });
  });

  describe('password hash', () => {
    it('requires a password hash', () => {
      const user = new User({
        email: 'email@test.com',
        passwordHash: null,
        role: 'user'
      });
      const { errors } = user.validateSync();
      expect(errors.passwordHash.message).toEqual('Path `passwordHash` is required.');
    });
  });
});
