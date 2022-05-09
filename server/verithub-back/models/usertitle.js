'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usertitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usertitle.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userID'
      });
      usertitle.belongsTo(models.title, {
        as: 'title',
        foreignKey: 'titleID'
      });
    }
  }
  usertitle.init({
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    titleID: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'usertitle',
  });
  return usertitle;
};