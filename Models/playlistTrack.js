const Model = require('objection').Model
const knex = require('../Config/database')

Model.knex(knex)

class PlaylistTrack extends Model{
  static get tableName(){
    return 'playlist_track'
  }
}

module.exports = PlaylistTrack