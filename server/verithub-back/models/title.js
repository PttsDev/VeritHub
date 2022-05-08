'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class title extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      title.belongsTo(models.course, {
        as: 'course',
        foreignKey: 'courseID'
      });

    }
  }
  title.init({
    courseID: {
      allowNull: false,
      type:DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'title',
  });
  return title;
};