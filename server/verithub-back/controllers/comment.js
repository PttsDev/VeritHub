const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const comment = require('../models').comment;
const user = require('../models').user;
const post = require('../models').post;

module.exports = {

  find(params, res) {
    comment.findAll({
      where: {
        postID: params.postID,
        previousCommentID: params.previousCommentID
      },
    })
      .then(async comment => {
        let response = {
          comments: comment,
          usernames: [],
          postTitle:"",
        }
        for await(const c of comment) {
          await user.findOne({
            where:{
            id: c.userID
          }
          }).then(user => {
            response.usernames.push(user.username)
          }).catch(error => res.status(400).send({ error: "imposible de encontrar" }));
        }

        await post.findOne({
          where: {
            id: params.postID
          }
        }).then( post => {
          response.postTitle = post.title
          console.log(post.title)
        }).catch(error => res.status(400).send({ error: "imposible de encontrar" }));

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
        userID: user.id,
        postID: params.postID,
        previousCommentID: params.commentID,
        text: params.text,
        likeNum: 0,
        dislikeNum: 0,
      })
        .then(comment => {
          res.status(200).send(comment)
        })
        .catch(error => res.status(400).send(error));

    }).catch(error => res.status(400).send({ error: "imposible de crear" }));
  }
}