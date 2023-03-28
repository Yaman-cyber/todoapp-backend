const messages = require("../../helpers/messages.json");

module.exports = async function (req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).send({
      success: false,
      unAuthorized: true,
      message: messages.unAuthorized,
    });
  else {
    next();
  }
};
