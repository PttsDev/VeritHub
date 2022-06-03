const Sequelize = require('sequelize');
const post = require('../models').post;
const user = require('../models').user;
const comment = require('../models').comment;


module.exports = {

    find(params, res){
        post.findAll({
          where: {
            [params.type]:params.instOrSubjId
          }
        })
        .then(async posts => {

          let response = {
            posts: posts,
            usernames: []
          }

          for await (const post of posts) {
            await user.findOne({
                id: post.userId
            }).then(user => {
              response.usernames.push(user.username)
            }).catch(error => res.status(400).send({ error: "imposible de encontrar" }));
          }
          
          res.status(200).send(response)

          
        })
        .catch(error => res.status(400).send({error: "imposible de encontrar"}));
    },

    create(params, res){

      console.log(params)
      user.findOne({
        where: {
          email: params.creator,
          password: params.pw
        }
      }).then(user => {
        if (user.length === 0) return res.status(400).send({ error: "imposible de crear" });

        id = params.type
        post.create({
          // Se crea el post
          userID: user.id,
          [id]: params.instOrSubjId,
          title: params.title,
          likeNum: 0,
          dislikeNum: 0 
        })
        .then(post => {
          // Se crea el primer comentario sin raiz del post
          comment.create({
            previousCommentID: null,
            postID: post.id,
            userID: user.id,
            likeNum: 0,
            dislikeNum: 0,
            text: params.body
          }).then(comment => {
            res.status(200).send(post)
          })
            .catch(error => res.status(400).send({error: "imposible de crear"}));
        })
        .catch(error => res.status(400).send({error: "imposible de crear"}));

      }).catch(error => res.status(400).send({error: "imposible de crear"}));
        

    }
}