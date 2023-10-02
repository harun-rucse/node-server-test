var express = require("express");

var app = express();

var server = require("http").createServer(app);

var io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("connection");

  socket.on("sendChatToServer", (message) => {
    console.log(message);

    // io.sockets.emit("sendChatToClient", message);
    socket.broadcast.emit("sendChatToClient", message);
  });

  socket.on("disconnect", (socket) => {
    console.log("Disconnect");
  });
});

app.get("/", function (req, res) {
  res.send("Hello World");
});
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
