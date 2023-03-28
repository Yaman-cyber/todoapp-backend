const { Chat } = require("../models/chat");
const { Message } = require("../models/message");
const messages = require("../helpers/messages.json");

async function startChat(req, res) {
  const { users, starter } = req.body;

  let exist = await Chat.findOne({ users });

  if (exist)
    return res
      .status(200)
      .send({ chat: exist, success: true, message: messages.addSuccsess });

  const chat = await Chat.create({ users, starter });

  return res
    .status(200)
    .send({ chat, success: true, message: messages.addSuccsess });
}

async function addMessage(req, res) {
  const post = await Message.create({
    chat: req.params.id,
    message: req.body.message,
    sender: req.user._id,
  });

  return res.status(200).send({ success: true, post });
}

async function getRecentChats(req, res) {
  const chats = await Chat.find({ users: req.user._id })
    .sort("-createdAt")
    .populate("users", "_id email");

  let data = [];

  chats.forEach((ele) => {
    let user = ele.users.find((user) => !user._id.equals(req.user._id));
    data.push({ _id: ele._id, name: user.email });
  });

  return res
    .status(200)
    .send({ chats: data, success: true, message: messages.getSuccess });
}

async function getMessagesByChat(req, res) {
  const chat = await Chat.findOne({ _id: req.params.id });

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: messages.notFound,
    });
  }

  const allMessages = await Message.find({ chat: chat._id }).sort("createdAt");

  return res.status(200).send({
    messages: allMessages,
    success: true,
    message: messages.getSuccess,
  });
}

module.exports = {
  startChat,
  addMessage,
  getRecentChats,
  getMessagesByChat,
};
