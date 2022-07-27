const Model = require("objection").Model;
const knex = require("../Config/database");

Model.knex(knex);

class InvoiceItems extends Model {
  static get tableName() {
    return "invoice_items";
  }
}

module.exports = InvoiceItems;
