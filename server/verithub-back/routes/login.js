var express = require('express');
var router = express.Router();
const { find } = require('../controllers/user');

/* Ruta para pedir datos de logueo */
router.post('/', function(req, res, next) {

  return find({email: req.body.email, pass: req.body.password}, res)

});

module.exports = router;
