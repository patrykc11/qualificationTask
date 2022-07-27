"use strict";
require("dotenv").config({ path: __dirname + "/Config/.env" });
const port = process.env.HTTP_PORT;
const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./Scripts/logger");
const logTracker = require("./Middleware/logTracker");

const musicRecords = require("./API/musicRecords");

app.use(require("express-status-monitor")());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logTracker);

app.use("/musicRecords", musicRecords);

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(404).send("PAGE NOT FOUND");
  logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.status("error", {
      message: err.message,
      error: err,
    });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status("error", {
    message: err.message,
    error: {},
  });
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
});
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.log("Path: ", req.path);
  next();
});

httpServer.listen(port, () => {
  console.log("server starting on port : " + port);
  logger.info(`Server started and running on port ${port}`);
});
