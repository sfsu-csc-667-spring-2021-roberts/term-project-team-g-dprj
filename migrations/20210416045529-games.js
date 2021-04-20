'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numberOfPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gameStats: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      action: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resultDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games');
  },
};
