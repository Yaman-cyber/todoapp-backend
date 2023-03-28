const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db)
    .then(() => winston.info(`Connected to Database...`))
    .catch((err) =>
      winston.info(`failed to connect to Database. an error occurred: ${err}`)
    );
};
