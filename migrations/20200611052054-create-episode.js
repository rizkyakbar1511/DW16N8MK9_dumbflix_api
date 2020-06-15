'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filmId: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: "Films",
            key: "id"
        }
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnailFilm: {
        type: Sequelize.STRING
      },
      linkFilm: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Episodes');
  }
};