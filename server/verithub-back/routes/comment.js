var express = require('express');
var router = express.Router();
const { create } = require('../controllers/comment');


router.post('/create', function(req, res, next) {
  return create(req.body, res);
});

module.exports = router;
