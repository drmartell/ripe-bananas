const mongoose = require('mongoose');

// {
//   name: <name-of-studio RS>,
//   address: {
//     city: <city S>
//     state: <state S>
//     country: <country S>
//   }
// }

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: String,
    state: String,
    country: String
  }
});

module.exports = mongoose.model('Studio', schema, 'studios');
