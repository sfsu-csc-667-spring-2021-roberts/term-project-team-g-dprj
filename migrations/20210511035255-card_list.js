'use strict';

const CARD_DEFINITIONS = [
  { name: 'attack', count: 4 },
  { name: 'cats', count: 20 },
  { name: 'defuse', count: 6 },
  { name: 'exploding', count: 4 },
  { name: 'favor', count: 4 },
  { name: 'nope', count: 5 },
  { name: 'see the future', count: 5 },
  { name: 'shuffle', count: 4 },
  { name: 'skip', count: 4 },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('card_list', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cardType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      })
      .then(() => {
        return queryInterface.bulkInsert(
          'card_list',
          CARD_DEFINITIONS.reduce((memo, { name, count }) => {
            for (let i = 0; i < count; i++) {
              memo.push({ cardType: name });
            }

            return memo;
          }, [])
        );
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('card_list');
  },
};
