const mongoose = require("mongoose");
const { User } = require("./models/user");
const { Task } = require("./models/task");
const { Chat } = require("./models/chat");
const { Message } = require("./models/message");

const fs = require("fs");

mongoose
  .connect("mongodb://127.0.0.1:27017/todoappDB")
  .then(() => console.log(`Connected to Database...`))
  .catch((err) => {
    console.log(err);
  });

const seed = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await Chat.deleteMany();
  await Message.deleteMany();

  await User.insertMany(require("./data/users.json"));

  await Task.insertMany(require("./data/tasks.json"));

  await Chat.insertMany(require("./data/chats.json"));

  await Message.insertMany(require("./data/messages.json"));

  console.log("Seed complete");
};

seed().then(() => {
  mongoose.connection.close();
});
