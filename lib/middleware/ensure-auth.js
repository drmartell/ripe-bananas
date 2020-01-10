const User = require('../models/User.model');

// module.exports = (req, res, next) => {
//   const token = req.cookies.session;

//   User
//     .findByToken(token)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(next);
// };

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.session;

  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

// const hasRoles = (rolesArr) => (req, res, next) => {
//   if(rolesArr.includes(user.role))....
// };

// isAuthorized({...req, req.role: 'admin'}, res, next)
const isAdmin = (req, res, next) => {
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

const isAuthorized = (req, res, next) => {
  const token = req.cookies.session;

  User
    .findByToken(token)
    .then(user => {
      if(user.role !== 'admin' ||
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
