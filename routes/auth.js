const express = require("express");
const router = express.Router();
const api = require("../controllers/auth");

router.post("/login/admin", api.addFirstAdmin);

router.post("/login", api.login);

router.post("/signup", api.signup);

module.exports = router;
