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

schema.statics.deleteByIdIfNoReviews = function(id) {
  return Promise.all([
    this.findById(id),
    this.model('Review').find({ reviewer: id })
  ])
    .then(([reviewer, reviews]) => {
      if(reviews.length) {
        return 'Cannot delete, reviewer has associated reviews.';
      } else {
        return this.findByIdAndRemove(reviewer.id);
      }
    });
};

// schema.methods.getReviews = function() {
//   return this.model('Review')
//     .find({ reviewer: this._id });
// };

schema.methods.addReviews = async function() {
  const reviewObj = JSON.parse(JSON.stringify(this));
  reviewObj.reviews = await this.model('Review')
    .find({ reviewer: this._id })
    .select({ __v: false });
  return reviewObj;
};

// schema.methods.deleteIfNoReviews = async function() {
//   const reviews = await this.model('Review')
//     .find({ reviewer: this._id });
//   return reviews ? 
//     'Cannot delete, reviewer has associated reviews.' :
//     this.model('Reviewer').findByIdAndRemove(this._id);
// };

module.exports = mongoose.model('Reviewer', schema, 'reviewers');
