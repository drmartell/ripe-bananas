const mongoose = require('mongoose');

// {
//   name: <name RS>,
//   dob: <date-of-birth D>,
//   pob: <place-of-birth S>
// }

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
});

module.exports = mongoose.model('Actor', schema, 'actors');
