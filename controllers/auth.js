const { User } = require("../models/user");
const messages = require("../helpers/messages.json");
const bcrypt = require("bcryptjs");

async function addFirstAdmin(req, res) {
  let { email, password } = req.body;
  let exist = await User.find({});

  if (exist.length !== 0)
    return res.status(403).send({ success: false, message: "exist" });

  req.body.email = email.toLowerCase();
  req.body.role = "admin";

  let newAdmin = new User(req.body);

  await newAdmin.save();

  return res.status(200).send({
    user: newAdmin,
    success: true,
    message: messages.addSuccsess,
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user)
    return res.status(401).send({
      user: null,
      success: false,
      message: messages.inavlidCreadintials,
    });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(401).send({
      user: null,
      success: false,
      message: messages.inavlidCreadintials,
    });

  const token = user.generateAuthToken();

  return res
    .status(200)
    .send({ user, token, success: true, message: messages.getSuccess });
}

async function signup(req, res) {
  const { email } = req.body;

  const exist = await User.findOne({ email: email.toLowerCase() });

  if (exist)
    return res.status(401).send({
      user: null,
      success: false,
      message: messages.userExist,
    });

  const user = new User(req.body);

  const token = user.generateAuthToken();

  await user.save();

  return res
    .status(200)
    .send({ user, token, success: true, message: messages.addSuccsess });
}

module.exports = { addFirstAdmin, login, signup };
