'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  institution.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    type: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    province: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isPublic: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    stars: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    photo: {
      allowNull: true,
      type: DataTypes.TEXT('medium')
    },
  }, {
    sequelize,
    modelName: 'institution',
  });
  return institution;
};