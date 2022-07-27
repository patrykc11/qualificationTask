const Model = require("objection").Model;
const knex = require("../Config/database");
const Tracks = require('../Models/tracks')

Model.knex(knex);

class Artists extends Model {
  static get tableName() {
    return "artists";
  }

  static get relationMappings(){
    return {
      tracks: {
        relation: Model.ManyToManyRelation,
        modelClass: Tracks,
        join: {
          from: 'artists.ArtistId',
          through: {
            from: 'albums.ArtistId',
            to: 'albums.AlbumId'
          },
          to: 'tracks.AlbumId'
        }
      },
    }
  }
}

module.exports = Artists;
