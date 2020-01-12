const User = require('../models/User.model');

const isLoggedIn = (req, _, next) => {
  const token = req.cookies.session;

  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

const isAdmin = (req, _, next) => {
  const token = req.cookies.session;

  User
    .findByToken(token)
    .then(user => {
      if(user.role !== 'admin')
        throw 'Not an admin';
      req.user = user;
      next();
    })
    .catch(next);
};

const isAuthorized = (req, _, next) => {
  const token = req.cookies.session;

  User
    .findByToken(token)
    .then(user => {
      if(user.role !== 'admin' &&
        user.role !== 'reviewer')
        throw 'Not authorized';
      req.user = user;
      next();
    })
    .catch(next);
};

// POST to reviews
// (isAuthorized);
// POST else
// (isAuthorized, isAdmin)
module.exports = {
  isLoggedIn,
  isAdmin,
  isAuthorized
};
