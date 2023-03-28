const winston = require("winston");
const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

require("./start/logging")();
require("./start/routes")(app);
require("./start/db")();
require("./start/config")();
require("./start/socket")(io);

const port = process.env.PORT || 3000;

const server = http.listen(port, () => {
  winston.info(`TodoApp listening on port ${port}...`);
});

//const server = app.listen(port, () =>
//  winston.info(`TodoApp listening on port ${port}...`)
//);
