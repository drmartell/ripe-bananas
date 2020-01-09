const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User.model');

const MAX_AGE_IN_MS = 24 * 60 * 60 * 1000; // 24 * 60 * 60 * 1000 = one day

function setSessionCookie(res, token) {
  res.cookie('session', token, {
    maxAge: MAX_AGE_IN_MS
  });
}

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  .get('logout', (req, res, next) => {
    req.logout();
    res.session.destroy();
    res.redirect('/')
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  });