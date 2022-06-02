const express = require('express');
const { findAll, create } = require('../controllers/course');
const router = express.Router();

/* Ruta para pedir datos de logueo */
router.post('/findAll', function(req, res, next) {
    
    return findAll({id: req.body.id}, res)
      
});

router.post('/create', function(req, res, next) {
    
    return create({name: req.body.name, price: req.body.price, minGrade: req.body.minGrade, stars: req.body.stars, numStudents: req.body.numStudents}, res)
      
});
  
module.exports = router;