const db = require('./connection');

const findById = (id) => {
  return db.one('SELECT id, email, fullname FROM users WHERE id=$1', [id]);
};

const findByEmail = (email) => {
  return db.one('SELECT * FROM users WHERE email=$1', [email]);
};

const create = (fullname, email, password) => {
  return db.one('INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING id, email, fullname', [
    fullname,
    email,
    password,
  ]);
};

module.exports = { findById, findByEmail, create };
