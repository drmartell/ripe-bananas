const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/studios', require('./routes/studios.routes'));
app.use('/api/v1/actors', require('./routes/actors.routes'));
app.use('/api/v1/reviewers', require('./routes/reviewers.routes'));
app.use('/api/v1/reviews', require('./routes/reviews.routes'));
app.use('/api/v1/films', require('./routes/films.routes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
