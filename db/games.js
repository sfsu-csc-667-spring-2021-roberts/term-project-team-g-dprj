const md5 = require('md5');
const db = require('./connection');

const allOpenGames = () =>
  db.any(
    'SELECT id, number_of_players, name FROM games WHERE number_of_players > (SELECT count(*) FROM game_users WHERE game_id=id)'
  );

const create = (name, numberOfPlayers, userId) =>
  db
    .one('INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING id, name', [name, numberOfPlayers])
    .then(({ id, name }) => Promise.all([{ id, name }, addPlayer(id, userId)]))
    .then(([game, playerInfo]) => game);

const shuffle_cards = (gameId) =>
  db.one('SELECT * FROM card_list').then((cards) =>
    cards
      .sort((a, b) => Math.random() - 0.5)
      .map((card, order) => ({ ...card, order }))
      .then((shuffledCards) => {
        return db.tx((transaction) => {
          transaction.batch(
            shuffledCards.map((card) => {
              db.one('INSERT INTO game_cards(game_id, card_id, ordering) VALUES(${game_id}, ${id}, ${order})', {
                game_id: gameId,
                ...card,
              });
            })
          );
        });
      })
      .then((result) => {
        // result is going to be an array of nulls so it doesnt matter, but we can proceed with the rest of the logic here
        // return the game object
      })
  );

const addPlayer = (gameId, userId) =>
  db.one('INSERT INTO game_users VALUES ($1, $2) RETURNING game_id AS id', [gameId, userId]);

const findById = (id) =>
  Promise.all([
    db.one('SELECT * FROM games WHERE id=$1', [id]),
    db.any(
      'SELECT users.id, users.fullname, users.email FROM game_users, users WHERE game_users.game_id=$1 AND game_users.user_id=users.id',
      [id]
    ),
  ]).then(([game, players]) => ({ ...game, players: players.map((player) => ({ ...player, hash: md5(player.id) })) }));

const debug = (result) => {
  console.log(result);
  return result;
};

const activeGames = (userId) =>
  db
    .any('SELECT game_id FROM game_users WHERE user_id=$1', [userId])
    .then((result) => result.map(({ game_id }) => game_id))
    .then((gameIds) => {
      if (gameIds.length > 0) {
        return db.any('SELECT * FROM games WHERE id IN ($1:csv)', [gameIds]);
      } else {
        return [];
      }
    })
    .catch(console.log);

module.exports = { allOpenGames, create, shuffle_cards, addPlayer, findById, activeGames };
