const mongoose = require('mongoose');

// {
//   rating: <rating number 1-5 RN>,
//   reviewer: <review _id RI>
//   review: <review-text, max-length 140 chars RS>,
//   film: <film-id RI>
// }

const schema = new mongoose.Schema({
  rating:   { type: Number, min: 1, max: 5, required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer', required: true },
  review:   { type: String, required: true, maxlength: 140 },
  film:     { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Film' }
});

module.exports = mongoose.model('Review', schema, 'reviews');
