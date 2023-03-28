const { User } = require("../models/user");
const messages = require("../helpers/messages.json");

async function getProfile(req, res) {
  let user = await User.findOne({ _id: req.user._id }).select(
    "-__v -__updatedAt -password"
  );

  if (!user)
    return res
      .status(403)
      .send({ user: null, success: false, message: messages.notFound });

  return res
    .status(200)
    .send({ user, success: true, message: messages.getSuccess });
}

module.exports = { getProfile };
