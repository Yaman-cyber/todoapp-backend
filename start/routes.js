const express = require("express");
const cors = require("cors");
const auth = require("../routes/auth");
const chat = require("../routes/chat");
const profile = require("../routes/profile");
const task = require("../routes/task");
const user = require("../routes/user");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/chat", chat);
  app.use("/api/profile", profile);
  app.use("/api/task", task);
  app.use("/api/user", user);
  app.use(error);
};
