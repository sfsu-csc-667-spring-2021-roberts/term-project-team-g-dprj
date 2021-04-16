'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('deck', {
      deckId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      deckName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mainDeck: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discardCard: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currentCard: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('deck');
  },
};
