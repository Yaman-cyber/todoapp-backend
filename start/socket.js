module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    console.log("a user connected");

    // Handle incoming chat messages
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg); // Send the message to all connected clients
    });
  });
};
