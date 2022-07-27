const Model = require("objection").Model;
const knex = require("../Config/database");

Model.knex(knex);

class Genres extends Model {
  static get tableName() {
    return "genres";
  }
}

module.exports = Genres;
