const mongoose = require('mongoose');
const { parse } = require('url');

module.exports = (url = process.env.MONGODB_URI) => {
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    const parsedUrl = parse(url);
    const redactedUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.pathname}`;
    console.log(`Connected to MongoDB at ${redactedUrl}`); //eslint-disable-line no-console
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB'); //eslint-disable-line no-console
  });

  mongoose.connection.on('error', () => {
    console.log('Error connecting to MongoDB'); //eslint-disable-line no-console
  });
};
