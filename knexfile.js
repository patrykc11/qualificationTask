const { knexSnakeCaseMappers } = require("objection");
// Update with your config settings.
require("dotenv").config({ path: __dirname + "/Config/.env" });

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE,
    },
    useNullAsDefault: true,
  },
  staging: {
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE,
    },
    useNullAsDefault: true,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE,
    },
    useNullAsDefault: true,
  },
};
