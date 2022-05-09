'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cousub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cousub.belongsTo(models.course, {
        as: 'course',
        foreignKey: 'courseID'
      });
      cousub.belongsTo(models.subject, {
        as: 'subject',
        foreignKey: 'subjectID'
      });

    }
  }
  cousub.init({
    courseID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subjectID: {  
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'cousub',
  });
  return cousub;
};