const Sequelize = require('sequelize');
const user = require('../models').user;

module.exports = {

  // Login
  find(params, res) {

    //Comprueba si el usuario existe
    let email = params.email;
    let pass = params.pass;

    user.findOne({
      where: {
        // Equivalente a [Sequelize.and]
        email: email,
        password: pass
      }
    })
      .then(user => {
        // Si existe devuelve los datos
        if (user.length === 0) res.status(200).send({ exists: false });
        else res.status(200).send({
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          photo: user.photo,
          isAdmin: user.isAdmin,
          exists: true
        });
      })
      .catch(error => {
        res.status(400).send({ error: error, exists: false })
      });
  },

  // Register
  create(params, res) {
    // Crea un usuario con los parametros dados (si se puede)
    let name = params.name;
    let surname = params.surname;
    let username = params.username;
    let email = params.email;
    let pw = params.pw;
    //let photo = params.photo;

    // Compruebo que los datos cumplen las reglas
    if (name.length < 3) return res.status(400).send({ error: 'El nombre debe tener al menos 3 caracteres' });
    if (surname.length < 3) return res.status(400).send({ error: 'El apellido debe tener al menos 3 caracteres' });
    if (username.length < 3) return res.status(400).send({ error: 'El nombre de usuario debe tener al menos 3 caracteres' });
    if (email.length < 3) return res.status(400).send({ error: 'El email debe tener al menos 3 caracteres' });
    if (pw.length < 6) return res.status(400).send({ error: 'La contraseña debe tener al menos 6 caracteres' });

    user.create({
      email: email,
      password: pw,
      username: username,
      fullName: name + ' ' + surname,
    })
      .then(user => {
        res.status(200).send({ created: true })
      })
      .catch(error => res.status(400).send({ created: false }));
  },

  async modify(params, res) {

    if (params.fullName.length < 3) return res.status(400).send({ error: 'El nombre debe tener al menos 3 caracteres' });
    if (params.userName.length < 3) return res.status(400).send({ error: 'El nombre de usuario debe tener al menos 3 caracteres' });
    if (params.email.length < 3) return res.status(400).send({ error: 'El email debe tener al menos 3 caracteres' });
    if (params.password.length < 6) return res.status(400).send({ error: 'La contraseña debe tener al menos 6 caracteres' });

    await user.update({
      username: params.userName,
      password: params.password,
      email: params.email,
      fullName: params.fullName
    }, {
      where: {
        email: params.oldEmail,
        password: params.oldPassword
      }
    }).then(() => {

      res.status(200).send({ updated: true })
    }).catch(error => {
      res.status(400).send({ error: error, exists: false })
    });
  },

  async modifyPhoto(params, res) {
    await user.update({
      photo: params.photo
    }, {
      where: {
        email: params.email,
        password: params.password
      }
    }).then(() => {
      res.status(200).send({ updated: true })
    }).catch(error => {
      console.log(error)
      res.status(400).send({ error: error, exists: false })
    });
  }
}