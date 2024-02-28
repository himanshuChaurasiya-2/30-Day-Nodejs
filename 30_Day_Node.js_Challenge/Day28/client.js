const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000");

ws.on("open", function open() {
  console.log("Connected to WebSocket server");

  ws.send("Hello, WebSocket server!");
});

ws.on("message", function incoming(data) {
  if (typeof data === "string") {
    console.log("Received message from server:", data);
  } else if (data instanceof Buffer) {
    console.log("Received message from server:", data.toString("utf8"));
  }
});

ws.on("close", function close() {
  console.log("Disconnected from WebSocket server");
});
