const express = require('express');
const { findAll, create, findById } = require('../controllers/subject');
const router = express.Router();

/* Ruta para pedir datos de logueo */
router.post('/findAll', function(req, res, next) {
    
    return findAll({courseID: req.body.courseID}, res)
      
});

router.post('/create', function(req, res, next) {

  return create({name: req.body.name, credits: req.body.credits, year: req.body.year, stars: req.body.stars, courseID: req.body.courseID}, res)
    
});

router.post('/findById', function(req, res, next) {
  return findById({subjectID: req.body.subjectID}, res)
}); 

module.exports = router;