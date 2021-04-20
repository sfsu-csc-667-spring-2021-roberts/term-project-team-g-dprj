const db = require('./connection');

const create = (name, numberOfPlayers) =>
  db.one('INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING id', [name, numberOfPlayers]);

const findById = (id) => db.one('SELECT * FROM games WHERE id=$1', [id]);

module.exports = { create, findById };
