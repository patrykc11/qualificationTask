const Model = require("objection").Model;
const knex = require("../Config/database");

Model.knex(knex);

class Invoices extends Model {
  static get tableName() {
    return "invoices";
  }
}

module.exports = Invoices;
