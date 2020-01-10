const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ensureAuth = require('./middleware/ensure-auth');

app.use(express.json());
app.use(cookieParser());

// signup, login, logout, verify
app.use('/api/v1/auth', require('./routes/auth.routes'));

// protect all POST, PUT, PATCH routes below
app.use((req, res, next) => {
  if(['post', 'put', 'patch'].includes(req.METHOD))
    ensureAuth(req, res, next);
  else next();
});

app.use('/api/v1/studios', require('./routes/studios.routes'));
app.use('/api/v1/actors', require('./routes/actors.routes'));
app.use('/api/v1/reviewers', require('./routes/reviewers.routes'));
app.use('/api/v1/reviews', require('./routes/reviews.routes'));
app.use('/api/v1/films', require('./routes/films.routes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
