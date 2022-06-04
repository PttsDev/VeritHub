const express = require('express');
const { findAll, create, find } = require('../controllers/course');
const router = express.Router();

/* Ruta para pedir datos de logueo */
router.post('/findAll', function(req, res, next) {
    console.log(req.body)
    return findAll({tipo: req.body.tipo, institutionID: req.body.institutionID}, res)
      
});

router.post('/find', function(req, res, next) {
    
    return find({name: req.body.name}, res)
      
});

router.post('/create', function(req, res, next) {
    
    return create({name: req.body.name, price: req.body.price, minGrade: req.body.minGrade, stars: req.body.stars, numStudents: req.body.numStudents, institutionID: req.body.institutionID, photo: req.body.photo}, res)
      
});
  
module.exports = router;