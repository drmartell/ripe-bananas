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

schema.methods.addFilms = async function() {
  const filmsObj = JSON.parse(JSON.stringify(this));
  filmsObj.reviews = await this.model('Film')
    .find({ studio: this._id }).select({ __v: false });
  return filmsObj;
};

module.exports = mongoose.model('Studio', schema, 'studios');
