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
        return this.findByIdAndDelete(reviewer.id);
      }
    });
};

// schema.methods.getReviews = function() {
//   return this.model('Review')
//     .find({ reviewer: this._id });
// };

schema.methods.addReviews = async function() {
  const reviewsObj = JSON.parse(JSON.stringify(this));
  reviewsObj.reviews = await this.model('Review')
    .find({ reviewer: this._id }).select({ __v: false });
  return reviewsObj;
};

module.exports = mongoose.model('Reviewer', schema, 'reviewers');
