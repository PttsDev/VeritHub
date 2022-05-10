'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    email: {
      allowNull: false, 
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    fullName: {
      allowNull: false, 
      type: DataTypes.STRING
    },
    photo: {
      allowNull: false,
      defaultValue: 'https://i.pinimg.com/736x/1c/b3/77/1cb37778107856d56e05d378db46eda9.jpg',
      type: DataTypes.STRING
    },
    isAdmin: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};