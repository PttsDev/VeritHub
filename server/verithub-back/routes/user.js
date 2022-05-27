var express = require('express');
var router = express.Router();
const { modify, modifyPhoto } = require('../controllers/user');

/* Ruta para pedir datos de logueo */
router.post('/modify', function(req, res, next) {
  if(req.body.photo!=null) return modifyPhoto(req.body, res);
  return modify(req.body, res)
});

module.exports = router;
