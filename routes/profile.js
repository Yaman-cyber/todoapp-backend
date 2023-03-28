const express = require("express");
const router = express.Router();
const api = require("../controllers/profile");
const auth = require("../middlewares/auth/auth");
const admin = require("../middlewares/auth/admin");

router.get("/", auth, api.getProfile);

module.exports = router;
