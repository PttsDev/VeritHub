var express = require('express');
var router = express.Router();
const { create } = require('../controllers/user');

/* Ruta para pedir datos de logueo */
router.post('/', function(req, res, next) {

  return create({name: req.body.name, surname: req.body.lastname, username: req.body.username, email: req.body.email, pw: req.body.password}, res);

});

module.exports = router;
