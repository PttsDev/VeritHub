'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subject.belongsTo(models.course, {
        as: 'course',
        foreignKey: 'courseID'
      });
    }
  }
  subject.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    credits: {
      allowNull: false,
      defaultValue: 6,
      type: DataTypes.INTEGER
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    stars: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    courseID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'subject',
  });
  return subject;
};