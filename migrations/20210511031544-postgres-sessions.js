'use strict';

/*
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('session', {
      sid: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      sess: { type: Sequelize.JSON, allowNull: false },
      expire: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('session');
  },
};
