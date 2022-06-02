const Sequelize = require('sequelize');
const comment = require('../models').comment;
const user = require('../models').user;

module.exports = {

  find(params, res) {
    comment.findAll({
    })
      .then(comment => {
        let response = {}
        res.status(200).send(response)
      })
      .catch(error => res.status(400).send({ error: "imposible de encontrar" }));
  },

  create(params, res) {

    user.findOne({
      where: {
        email: params.creator,
        password: params.pw
      }

    }).then(user => {
      if (user.length === 0) return res.status(400).send({ error: "imposible de crear" });

      comment.create({
        // Se crea el comentario

      })
        .then(comment => {
          res.status(200).send(comment)
        })
        .catch(error => res.status(400).send(error));

    }).catch(error => res.status(400).send({ error: "imposible de crear" }));
  }
}