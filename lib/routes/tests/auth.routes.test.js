require('dotenv').config();
const { agents, User } = require('../../helpers/data-helpers');

describe('auth routes', () => {

  it('can signup a user with email and password', () =>
    agents.none
      .post('/api/v1/auth/signup')
      .send({ email: 'signup@test.com', password: 'password' })
      .then(res => {
        //expect(res.header['Set-Cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'signup@test.com',
          role: 'user',
          __v: expect.any(Number)
        });
      }));
	
  it('can login a user with an email and password', async() => {
    const user = await User.create({
      email: 'login@test.com',
      password: 'password'
    });

    return agents.user
      .post('/api/v1/auth/login')
      .send({ email: 'login@test.com', password: 'password' })
      .then(res => {
        //expect(res.header['Set-Cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: user.id,
          email: 'login@test.com',
          role: 'user',
          __v: expect.any(Number)
        });
      });
  });
	
  it('will not log in a user with a bad email', async() => {
    await User.create({
      email: 'check-email@test.com',
      password: 'password'
    });

    return agents.user
      .post('/api/v1/auth/login')
      .send({ email: 'wrong-email@test.com', password: 'password' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });
	
  it('will not log in a user with a bad password', async() => {
    await User.create({
      email: 'check-password@test.com',
      password: 'password'
    });

    return agents.user
      .post('/api/v1/auth/login')
      .send({ email: 'check-password@test.com', password: 'wrong-password' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });
	
  it('can verify if a user is logged in', async() => {
    const user = await User.create({
      email: 'verify-login@test.com',
      password: 'password'
    });

    await agents.user
      .post('/api/v1/auth/login')
      .send({ email: 'verify-login@test.com', password: 'password' });

    return agents.user
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'verify-login@test.com',
          role: 'user',
          __v: expect.any(Number)
        });
      });
  });
});
