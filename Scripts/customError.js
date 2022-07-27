const logger = require("./logger");

class CustomError extends Error {
  constructor(
    code = 500,
    messageID = "00000",
    errorMessage = "Internal server error",
    allStack = null,
    loggerID = null
  ) {
    super(code, messageID, errorMessage);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.code = code;
    this.messageID = messageID;
    this.errorMessage = errorMessage;
    this.allStack = allStack;
    this.date = new Date();
    this.loggerID = loggerID;
    if (this.loggerID != null || this.loggerID != undefined) {
      logger.error(
        `${this.loggerID} - ${this.code} - ${this.errorMessage} - ${this.messageID} - ${this.allStack}`
      );
    }
  }
}
module.exports = CustomError;
