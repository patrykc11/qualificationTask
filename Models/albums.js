const Model = require("objection").Model;
const knex = require("../Config/database");
const Tracks = require('../Models/tracks')

Model.knex(knex);

class Albums extends Model {
  static get tableName() {
    return "albums";
  }

  // static get relationMappings(){
  //   return {
  //     tracks: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Tracks,
  //       join: {
  //         from: 'albums.AlbumId',
  //         to: 'tracks.AlbumId'
  //       }
  //     },
  //   }
  // }
}

module.exports = Albums;
