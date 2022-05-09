'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cousubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      subjectID: {  
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'subjects',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cousubs');
  }
};