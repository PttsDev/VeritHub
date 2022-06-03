var express = require('express');
var router = express.Router();
const { create, find } = require('../controllers/comment');


router.post('/create', function(req, res, next) {
  return create(req.body, res);
});

router.post('/find', function(req, res, next) {
  return find(req.body, res);
});

module.exports = router;
