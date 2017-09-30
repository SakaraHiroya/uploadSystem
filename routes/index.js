var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/upload', function (req, res, next) {
  res.render('upload');
});

router.get('/', function (req, res, next) {
  res.redirect('/upload');
});

module.exports = router;