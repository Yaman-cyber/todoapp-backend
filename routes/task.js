const express = require("express");
const router = express.Router();
const api = require("../controllers/task");
const auth = require("../middlewares/auth/auth");
const admin = require("../middlewares/auth/admin");

router.post("/", [auth, admin], api.addTask);

router.post("/close", auth, api.closeMyTodo);

router.get("/", auth, api.getTasks);

router.get("/:id", auth, api.getTaskById);

router.put("/:id", auth, api.editTask);

router.delete("/:id", [auth, admin], api.deleteTask);

module.exports = router;
