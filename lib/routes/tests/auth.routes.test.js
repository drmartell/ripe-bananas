require('dotenv').config();

const request = require('supertest');
const app = require('../../app');
const agent = request.agent(app);
const connect = require('../../utils/connect');
const mongoose = require('mongoose');
const User = require('../../models/User.model');

beforeAll(async() => {
  connect();
  
  await User
    .create({
      name: 'Megaman',
      email: 'mega@man.com',
      password: 'somega'
    });
    
  await agent
    .post('/api/v1/auth/login')
    .send({
      email:'mega@man.com',
      password: 'somega'
    });
});
//beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

describe('auth routes', () => {

  it('can signup a user with email and password', () => agent
    .post('/api/v1/auth/signup')
    .send({ email: 'signup@test.com', password: 'password' })
    .then(res => {
      expect(res.header['Set-Cookie'][0]).toEqual(expect.stringContaining('session='));
      expect(res.body).toEqual({
        _id: expect.any(String),
        email: 'signup@test.com',
        __v: expect.any(Number)
      });
    }));
	
  it.skip('can login a user with an email and password', async() => {
    const user = await User.create({
      email: 'login@test.com',
      password: 'password'
    });

    return agent
      .post('/api/v1/auth/login')
      .send({ email: 'login@test.com', password: 'password' })
      .then(res => {
        expect(res.header['Set-Cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: user.id,
          email: 'login@test.com',
          __v: expect.any(Number)
        });
      });
  });
	
  it.skip('will not log in a user with a bad email', async() => {
    await User.create({
      email: 'check-email@test.com',
      password: 'password'
    });

    return agent
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
	
  it.skip('will not log in a user with a bad password', async() => {
    await User.create({
      email: 'check-password@test.com',
      password: 'password'
    });

    return agent
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
	
  it.skip('can verify if a user is logged in', async() => {
    const user = await User.create({
      email: 'verify-login@test.com',
      password: 'password'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'verify-login@test.com', password: 'password' });

    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'verify-login@test.com',
          __v: expect.any(Number)
        });
      });
  });
});
