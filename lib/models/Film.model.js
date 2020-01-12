const mongoose = require('mongoose');

// {
//   title: <title of film RS>,
//   studio: <studio _id RI>,
//   released: <4-digit year RN>,
//   cast: [{
//     role: <name of character S>,
//     actor: <actor _id RI>
//   }]
// }

const schema = new mongoose.Schema({
  title:  { type: String, required : true },
  studio: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio', required: true },
  released: { type: Number, min: 1000, max: 9999, required: true },
  cast: [{
    role: String,
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor', required: true }
  }]
});

schema.methods.addReviews = async function() {
  //const filmsWithReviews = this.populate('reviews');
  const filmObj = JSON.parse(JSON.stringify(this));
  filmObj.reviews = await this.model('Review')
    .find({ film: this._id })
    // now we have review
    .populate('reviewer', 'name')
    .select({ __v: false, film: false });
  return filmObj;
};

module.exports = mongoose.model('Film', schema, 'films');
