const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    message: { type: String },
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
