"use strict";
require("dotenv").config({ path: __dirname + "/config/.env" });
const Tracks = require("../Models/tracks");
const Genres = require("../Models/genres");
const Artists = require("../Models/artists");
const Albums = require("../Models/albums");
const CustomError = require("../Scripts/customError");

class MusicRecordsService {
  async GetAllTracks() {
    try {
      let errorMessage = null;
      let messageID = "00000";
      let errorCode = 500;
      let allTracks = [];
      allTracks = await Tracks.query();
      if(allTracks){
        errorMessage = "Getting all tracks successfully";
        messageID = "11111";
        errorCode = 200;
      }
      return [allTracks, errorMessage, messageID, errorCode];
    } catch (err) {
      console.log(err);
      throw new CustomError(503, "00001", "Get all tracks service unavailable", err.stack);
    }
  }

  async GetAllArtistsFromGenre(genreName) {
    try {
      let errorMessage = null;
      let messageID = "00000";
      let errorCode = 500;
      let allArtists = [];
      const ifGerneExists = await Genres.query().findOne("Name", genreName)
      if (ifGerneExists === undefined){
        errorMessage = "Genre " + genreName + " does not exist";
        messageID = "00003";
        errorCode = 400;
        return [allArtists, errorMessage, messageID, errorCode];
      }
      allArtists = await Artists.query().joinRelated('tracks').where('tracks.GenreId', ifGerneExists.GenreId).distinct('artists.Name').orderBy('artists.Name')
      allArtists = allArtists.map( artist => artist.Name)
      if(allArtists.length >= 0){
        errorMessage = "Getting all artists from gerne successfully";
        messageID = "11111";
        errorCode = 200;
      }
      return [allArtists, errorMessage, messageID, errorCode];
    } catch (err) {
      console.log(err);
      throw new CustomError(503, "00002", "Get all artists from given gerne service unavailable", err.stack);
    }
  }

  async GetNumberOfTracksFromArtists() {
    try {
      let errorMessage = null;
      let messageID = "00000";
      let errorCode = 500;
      let allArtistsWithAmoutOFTracks = [];
      
      const artists = await Artists.query()
      let trackList = []
      for(let i = 0; i < artists.length; i++ ){
        trackList = await Tracks.query().select().joinRelated('artists').where('artists.ArtistId', artists[i].ArtistId).whereNot('tracks.MediaTypeId', 3)
        artists[i].amountOfMusicTracks = trackList.length
        allArtistsWithAmoutOFTracks.push(artists[i])
      }
      
      if(allArtistsWithAmoutOFTracks.length >= 0){
        errorMessage = "Getting all counts successfully";
        messageID = "11111";
        errorCode = 200;
      }
      return [allArtistsWithAmoutOFTracks, errorMessage, messageID, errorCode];
    } catch (err) {
      console.log(err);
      throw new CustomError(503, "00004", "Get amount of tracks from all artists service unavailable", err.stack);
    }
  }

  async GetAllAlbumsFromArtist(artistName) {
    try {
      let errorMessage = null;
      let messageID = "00000";
      let errorCode = 500;
      let allAlbums = [];
      const ifArtistExists = await Artists.query().findOne("Name", artistName)
      if (ifArtistExists === undefined){
        errorMessage = "Artist " + artistName + " does not exist";
        messageID = "00006";
        errorCode = 400;
        return [allAlbums, errorMessage, messageID, errorCode];
      }
      allAlbums = await Albums.query().where('ArtistId', ifArtistExists.ArtistId)
      if(allAlbums.length >= 0){
        errorMessage = "Getting all albums from artist successfully";
        messageID = "11111";
        errorCode = 200;
      }
      return [allAlbums, errorMessage, messageID, errorCode];
    } catch (err) {
      console.log(err);
      throw new CustomError(503, "00006", "Get all albums from given artist service unavailable", err.stack);
    }
  }
}

module.exports = MusicRecordsService;
