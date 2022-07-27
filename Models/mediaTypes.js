const Model = require("objection").Model;
const knex = require("../Config/database");

Model.knex(knex);

class MediaTypes extends Model {
  static get tableName() {
    return "media_types";
  }
}

module.exports = MediaTypes;
