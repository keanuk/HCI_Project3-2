var express = require('express');
var router = express.Router();
var Organization = require('../models/organization.model.js');


router.get('/organizations', function(req, res){
  Organization.find({}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        organizations: documents
      });
    }
  });
});
router.get('/organizations/:id', function(req, res){
  Organization.find({_id: req.params.id}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        organizations: documents
      });
    }
  });
});
router.post('/organizations', function(req, res){
  var organization = new Organization(req.body);
  organization.save(function(err){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(201).json({
        msg: 'Successfully created a new organization'
      });
    }
  });
});
router.put('/organizations/:id', function(req, res){
  Organization.findOneAndUpdate({_id: req.params.id}, req.body, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully updated'
      });
    }
  });
});
router.delete('/organizations/:id', function(req, res){
  Organization.remove({_id: req.params.id}, function(err){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully deleted'
      });
    }
  });
});

module.exports = router;
