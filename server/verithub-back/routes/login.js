var express = require('express');
var router = express.Router();

/* Ruta para pedir datos de logueo */
router.post('/', function(req, res, next) {
  
  /* Tomar los datos que se envian por POST para comprobar el usuario */
  let userExists = false;

  let userEmail = req.body.email;
  let userPassword = req.body.password;
  let userName = '';
  let userPhoto = '';

  // TODO: COMPROBAR SI EXISTE Y ASIGNAR DATOS

  /* USUARIOS DE PRUEBA HASTA QUE HAYA BASE DE DATOS !! */
  /* Datos falsos !!! BORRAR ! */
  if(userEmail == 'admin@admin.es' && userPassword == 'admin1') {
    userExists = true;
    userName = 'Administrador';
    userPhoto = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
  } else if (userEmail == 'user@user.es' && userPassword == 'user11') {
    userExists = true;
    userName = 'Pedro';
    userPhoto = 'https://avatars2.githubusercontent.com/u/17098477?s=460&v=4';
  }

  if(userExists) res.send({name: userName, photo: userPhoto, email: userEmail, exists: true});
  else res.send({exists: false});

});

module.exports = router;
