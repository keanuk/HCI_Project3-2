var mongoose = require('mongoose');

// Mongoose Schema
var organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: String,
  website: String,
  facebookURL: String,
  description: String,
  category: String,
  events: [{
    title: String,
    description: String,
    host: String,
    location: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  feed: [{
    message: String
  }],
  headerImg: {
    type: String,
    default: '/images/brick-wall.jpg'
  },
  profileImg: {
    type: String,
    default: 'http://via.placeholder.com/400x300'
  }
});

// Mongoose Model
var Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
