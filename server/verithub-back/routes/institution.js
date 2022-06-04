const express = require('express');
const { find, create, findCointains } = require('../controllers/institution');
const router = express.Router();

/* Ruta para pedir datos de logueo */
router.post('/find', function(req, res, next) {
  
  return find({tipo: req.body.tipo, atributo: req.body.atributo}, res)
    
});

router.post('/create', function(req, res, next) {
  
  return create({name: req.body.name, type: req.body.type, province: req.body.province, stars: req.body.stars, isPublic: req.body.isPublic, photo: req.body.photo}, res)
    
});

router.post('/findCointains', function(req, res, next) {
  
  return findCointains({name: req.body.name}, res)

});

module.exports = router;