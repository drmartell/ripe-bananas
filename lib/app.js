const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { isLoggedIn, isAdmin } = require('./middleware/ensure-auth');

app.use(express.json());
app.use(cookieParser());

// signup, login, logout, verify
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/reviews', require('./routes/reviews.routes'));

// protect routes with auth by VERB
app.use((req, res, next) => {
  if(['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)){
    const isAdminNext = err => {
      if(err)
        return next(err);
      isAdmin(req, res, next);
    };
    isLoggedIn(req, res, isAdminNext);
  }
  else next();
});

app.use('/api/v1/studios', require('./routes/studios.routes'));
app.use('/api/v1/actors', require('./routes/actors.routes'));
app.use('/api/v1/reviewers', require('./routes/reviewers.routes'));
app.use('/api/v1/films', require('./routes/films.routes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
