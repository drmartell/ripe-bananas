const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email:        { required: true, type: String, unique: [true, 'Email is taken'] },
  passwordHash: { required: true, type: String }, // created by virtual below
  role:         { required: true, type: String, enum: ['admin', 'reviewer', 'user'], default: 'user' }
}, {
  toJSON: { transform: (doc, ret) => { delete ret.passwordHash; } }
});

schema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, 14);
});

schema.statics.authorize = async function({ email, password }) {
  const user = await this.findOne({ email });
  if(!user) {
    const err = new Error('Invalid Email/Password');
    err.status = 401;
    throw err;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if(!validPassword) {
    const err = new Error('Invalid Email/Password');
    err.status = 401;
    throw err;
  }

  return user;
};

schema.methods.authToken = function(){
  return jwt.sign(this.toJSON(), process.env.APP_SECRET, { expiresIn: '30d' });
};

schema.statics.findByToken = function(token) {
  try {
    const tokenPayload = jwt.verify(token, process.env.APP_SECRET);
    return Promise.resolve(this.hydrate({
      _id: tokenPayload._id,
      email: tokenPayload.email,
      role: tokenPayload.role,
      __v : tokenPayload.__v
    }));
  } catch(err) {
    return Promise.reject(err);
  }
};

module.exports = mongoose.model('User', schema, 'users');
