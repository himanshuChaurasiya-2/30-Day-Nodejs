// File: app.js

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// WebSocket server setup
wss.on("connection", function connection(ws) {
  console.log("A new client connected.");

  // Event listener for when a message is received from a client
  ws.on("message", function incoming(message) {
    // console.log("Received message from client:", { message });
    console.log(`Received message from client: ${message}`);

    // Echo the received message back to the client
    ws.send(message);
    // ws.send(`Received message from client: ${message}`);
  });

  // Event listener for when the client closes the connection
  ws.on("close", function close() {
    console.log("Client disconnected.");
  });
});

// Serve the HTML page with JavaScript to establish WebSocket connection
app.get("/websocket", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "websocket.html"));

  res.send("started server");
  const name = req.body;
  res.send(name);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
