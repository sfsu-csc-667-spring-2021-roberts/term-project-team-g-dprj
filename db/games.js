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

// For this gameId, we need to copy all cards in card_list table into game_cards table, shuffled
// * select * from card_list => array of cards
// * shuffle that array
// * insert all of that into game_cards:
//    * game id we create above
//    * card ids in shuffled order (using the ordering field for the shuffled index)

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

module.exports = { allOpenGames, create, addPlayer, findById, activeGames };
