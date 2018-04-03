var express = require('express');
var router = express.Router();

/* GET orgs page. */
router.get('/', function(req, res, next) {
  res.render('organizations', { title: 'Add Organization' });
});

module.exports = router;
