var express = require('express');
var router = express.Router();
var Organization = require('../models/organization.model.js');

router.get('/profile/:id', function(req, res) {
  Organization.find({_id: req.params.id}, function(err, organization) {
    if (err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.render('profile', {organization: organization});
    }
  })
})

module.exports = router;
