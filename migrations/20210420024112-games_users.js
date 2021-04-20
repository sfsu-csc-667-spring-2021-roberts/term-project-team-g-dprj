'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('game_users', {
      game_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'games', key: 'id' } },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_users');
  },
};
