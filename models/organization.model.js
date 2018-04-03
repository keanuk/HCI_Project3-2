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
  events: [{
    title: String,
    description: String,
    host: String,
    location: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

// Mongoose Model
var Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
