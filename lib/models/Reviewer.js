const mongoose = require('mongoose');

// {
//   name: <string RS>,
//   company: <company or website name RS>
// }

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Reviewer', schema, 'reviewers');
