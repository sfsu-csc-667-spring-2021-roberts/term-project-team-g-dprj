'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('game_cards', {
      game_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      ordering: { type: Sequelize.INTEGER, allowNull: false },
      hand_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_cards');
  },
};
