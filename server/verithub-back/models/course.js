'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  course.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    minGrade: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    stars: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    numStudents: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};