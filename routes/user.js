const express = require("express");
const router = express.Router();
const api = require("../controllers/user");
const auth = require("../middlewares/auth/auth");

router.get("/", auth, api.getUsers);

module.exports = router;
