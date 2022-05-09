'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inscourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inscourse.belongsTo(models.institution, {
        as: 'institution',
        foreignKey: 'institutionID'
      });
      inscourse.belongsTo(models.course, {
        as: 'course',
        foreignKey: 'courseID'
      });
    }
  }
  inscourse.init({
    institutionID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    courseID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'inscourse',
  });
  return inscourse;
};