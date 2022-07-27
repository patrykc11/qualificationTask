"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("../Scripts/logger");
const MusicRecordsService = require("../Services/musicRecords");
const MusicRecordsServiceInstance = new MusicRecordsService();
const {
  allArtistsFromGenreValidation,
  allAlbumsFromArtistValidation,
} = require("../Middleware/Validation/musicRecords");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// trying if db connection works
router.get("/allTracks", async function (req, res) {
  try {
    const [tracksArray, errorMessage, messageID, errorCode] =
      await MusicRecordsServiceInstance.GetAllTracks();

    logger.info(`${req.loggerID} - ${errorCode} - ${errorMessage} - ${messageID}`);

    res.status(errorCode).json({
      tracksArray: tracksArray,
      errorMessage: errorMessage,
      messageID: messageID,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      tracksArray: [],
      errorMessage: err.errorMessage ? err.errorMessage : "Internal server error",
      messageID: err.messageID ? err.messageID : "00000",
    });
  }
});

router.get("/allArtistsFromGenre", allArtistsFromGenreValidation, async function (req, res) {
  try {
    const [artistsArray, errorMessage, messageID, errorCode] =
      await MusicRecordsServiceInstance.GetAllArtistsFromGenre(req.query.genreName);

    logger.info(`${req.loggerID} - ${errorCode} - ${errorMessage} - ${messageID}`);

    res.status(errorCode).json({
      artistsArray: artistsArray,
      errorMessage: errorMessage,
      messageID: messageID,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      artistsArray: [],
      errorMessage: err.errorMessage ? err.errorMessage : "Internal server error",
      messageID: err.messageID ? err.messageID : "00000",
    });
  }
});

router.get("/amoutOfTracksFromArtists", async function (req, res) {
  try {
    const [amoutArray, errorMessage, messageID, errorCode] =
      await MusicRecordsServiceInstance.GetNumberOfTracksFromArtists();

    logger.info(`${req.loggerID} - ${errorCode} - ${errorMessage} - ${messageID}`);

    res.status(errorCode).json({
      amoutArray: amoutArray,
      errorMessage: errorMessage,
      messageID: messageID,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      amoutArray: [],
      errorMessage: err.errorMessage ? err.errorMessage : "Internal server error",
      messageID: err.messageID ? err.messageID : "00000",
    });
  }
});

router.get("/allAlbumsFromArtist", allAlbumsFromArtistValidation, async function (req, res) {
  try {
    const [allAlbums, errorMessage, messageID, errorCode] =
      await MusicRecordsServiceInstance.GetAllAlbumsFromArtist(req.query.artistName);

    logger.info(`${req.loggerID} - ${errorCode} - ${errorMessage} - ${messageID}`);

    res.status(errorCode).json({
      allAlbums: allAlbums,
      errorMessage: errorMessage,
      messageID: messageID,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      allAlbums: [],
      errorMessage: err.errorMessage ? err.errorMessage : "Internal server error",
      messageID: err.messageID ? err.messageID : "00000",
    });
  }
});

module.exports = router;
