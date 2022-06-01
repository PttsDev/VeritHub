'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      minGrade: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      stars: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      numStudents: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      photo: {
        allowNull: true,
        type: Sequelize.TEXT('medium')
      },
      institutionID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'institutions',
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
    await queryInterface.dropTable('courses');
  }
};