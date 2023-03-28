const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivatekey")) {
    throw new Error("FATAL ERROR:jwtPrivatekey is not defined");
  }

  if (!config.get("db")) {
    throw new Error("FATAL ERROR:db is not defined");
  }
};
