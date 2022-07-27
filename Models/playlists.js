const Model = require('objection').Model
const knex = require('../Config/database')

Model.knex(knex)

class Playlists extends Model{
  static get tableName(){
    return 'playlists'
  }
}

module.exports = Playlists