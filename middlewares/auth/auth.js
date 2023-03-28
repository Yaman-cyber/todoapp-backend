const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const messages = require("../../helpers/messages.json");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(403).send({
      success: false,
      unAuthorized: true,
      message: messages.unAuthorized,
    });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivatekey"));

    const user = await User.findOne({ _id: decoded._id });

    if (!user)
      res.status(403).send({
        success: false,
        unAuthorized: true,
        message: messages.invalidToken,
      });

    req.user = user.toObject();

    next();
  } catch (ex) {
    res.status(403).send({
      success: false,
      unAuthorized: true,
      message: messages.invalidToken,
    });
  }
};
