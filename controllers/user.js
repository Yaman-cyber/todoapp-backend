const { User } = require("../models/user");
const messages = require("../helpers/messages.json");

async function getUsers(req, res) {
  let users = await User.find({}).select("_id email").sort("email");

  return res
    .status(200)
    .send({ users, success: true, message: messages.getSuccess });
}

module.exports = { getUsers };
