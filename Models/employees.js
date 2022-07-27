const Model = require("objection").Model;
const knex = require("../Config/database");

Model.knex(knex);

class Employees extends Model {
  static get tableName() {
    return "employees";
  }
}

module.exports = Employees;
