const Model = require("objection").Model;
const knex = require("../Config/database");

Model.knex(knex);

class Customers extends Model {
  static get tableName() {
    return "customers";
  }
}

module.exports = Customers;
