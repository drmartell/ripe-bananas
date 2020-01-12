const mongoose = require('mongoose');

// {
//   name: <name RS>,
//   dob: <date-of-birth D>,
//   pob: <place-of-birth S>
// }

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: Date,
  pob: String
});

schema.methods.addFilms = async function() {
  const actorObj = JSON.parse(JSON.stringify(this));
  actorObj.films = await this.model('Film')
    .find({ 'cast.actor': this._id }).select({ __v: false });
  return actorObj;
};

module.exports = mongoose.model('Actor', schema, 'actors');
