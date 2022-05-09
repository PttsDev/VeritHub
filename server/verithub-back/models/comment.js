'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userID'
      });
      comment.belongsTo(models.post, {
        as: 'post',
        foreignKey: 'postID'
      });
      comment.belongsTo(models.comment, {
        as: 'parent',
        foreignKey: 'previousCommentID'
      });
    }
  }
  comment.init({
    previousCommentID: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    postID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    likeNum: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    dislikeNum: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};