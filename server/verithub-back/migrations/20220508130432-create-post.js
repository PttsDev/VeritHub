'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      subjectID: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'subjects',
          key: 'id'
        }
      },
      courseID: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      likeNum: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      dislikeNum: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('posts');
  }
};