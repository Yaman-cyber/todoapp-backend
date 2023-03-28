const express = require("express");
const router = express.Router();
const api = require("../controllers/chat");
const auth = require("../middlewares/auth/auth");

router.get("/", auth, api.getRecentChats);

router.get("/:id", auth, api.getMessagesByChat);

router.post("/initiate", auth, api.startChat);

router.post("/:id/message", auth, api.addMessage);

module.exports = router;
