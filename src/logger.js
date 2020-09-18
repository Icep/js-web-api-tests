var winston = require("winston");
var process = require("process");

const consoleTransport = new winston.transports.Console();

const winstonInstance = winston.createLogger({
  level: process.env.NODE_ENV || "debug",
  format: winston.format.json(),
  transports: [consoleTransport],
});

const debug = (message, meta) => {
  winstonInstance.debug(message, { meta });
};

const info = (message, meta) => {
  winstonInstance.info(message, { meta });
};

const warn = (message, meta) => {
  winstonInstance.warn(message, { meta });
};

const error = (message, meta) => {
  winstonInstance.error(message, { meta });
};

module.exports = {
  debug,
  info,
  error,
  warn,
};
