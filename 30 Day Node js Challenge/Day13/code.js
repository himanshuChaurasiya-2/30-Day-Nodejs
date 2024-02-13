const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname)));

wss.on("connection", function connection(ws) {
  console.log("connected.");

  ws.on("message", function incoming(message) {
    console.log(`message from client: ${message}`);
  });

  ws.on("close", function close() {
    console.log("Client disconnected.");
  });
});

//Port

app.get("/websocket", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "websocket.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
