const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
module.exports = createLogger({
  transports: new DailyRotateFile({
    filename: "Logs/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "30d",
    prepend: true,
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf((log) => `${log.level}: ${[log.timestamp]}: ${log.message}`)
    ),
  }),
});
