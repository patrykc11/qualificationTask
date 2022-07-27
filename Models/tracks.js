const Model = require('objection').Model
const knex = require('../Config/database')


Model.knex(knex)

class Tracks extends Model{
  static get tableName(){
    return 'tracks'
  }

  static get relationMappings(){
    const Artists = require('../Models/artists')
    return {
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: Artists,
        join: {
          from: 'tracks.AlbumId',
          through: {
            from: 'albums.AlbumId',
            to: 'albums.ArtistId'
          },
          to: 'artists.ArtistId'
        }
      },
    }
  }
}

module.exports = Tracks