'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userID'
        });
      post.belongsTo(models.course, {
        as: 'course',
        foreignKey: 'courseID'
      });

    }
  }
  post.init({
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subjectID: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    courseID: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
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
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};