const Joi = require("joi");
const CustomError = require("../../Scripts/customError");
const logger = require("../../Scripts/logger");

const allArtistsFromGenreValidation = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        genreName: Joi.string()
          .error(new CustomError(406, "00003", "Invalid genre format"))
          .required(),
      })
      .required();
    const requestData = req.query;
    if (schema.validate(requestData).error) {
      const validationError = schema.validate(requestData).error;
      logger.info(
        `${req.loggerID} - ${406} - ${validationError.errorMessage} - ${validationError.messageID}`
      );
      return res.status(406).json({
        artistsArray: [],
        errorMessage: validationError.errorMessage,
        messageID: validationError.messageID,
      });
    } else {
      return next();
    }
  } catch (err) {
    logger.error(
      `${req.loggerID} - ${err.code ? err.code : 500} - ${
        err.errorMessage ? err.errorMessage : "Internal server error"
      } - ${err.messageID ? err.messageID : "00000"}`
    );
    return res.status(err.code ? err.code : 500).json({
      artistsArray: [],
      errorMessage: err.errorMessage ? err.errorMessage : "Internal server error",
      messageID: err.messageID ? err.messageID : "00000",
    });
  }
};

const allAlbumsFromArtistValidation = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        artistName: Joi.string()
          .error(new CustomError(406, "00005", "Invalid artist name format"))
          .required(),
      })
      .required();
    const requestData = req.query;
    if (schema.validate(requestData).error) {
      const validationError = schema.validate(requestData).error;
      logger.info(
        `${req.loggerID} - ${406} - ${validationError.errorMessage} - ${validationError.messageID}`
      );
      return res.status(406).json({
        allAlbums: [],
        errorMessage: validationError.errorMessage,
        messageID: validationError.messageID,
      });
    } else {
      return next();
    }
  } catch (err) {
    logger.error(
      `${req.loggerID} - ${err.code ? err.code : 500} - ${
        err.errorMessage ? err.errorMessage : "Internal server error"
      } - ${err.messageID ? err.messageID : "00000"}`
    );
    return res.status(err.code ? err.code : 500).json({
      allAlbums: [],
      errorMessage: err.errorMessage ? err.errorMessage : "Internal server error",
      messageID: err.messageID ? err.messageID : "00000",
    });
  }
};

module.exports = {
  allArtistsFromGenreValidation,
  allAlbumsFromArtistValidation,
};
