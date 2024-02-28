const WebSocket = require("ws");

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });
  const clients = new Set();

  wss.on("connection", (ws) => {
    clients.add(ws);

    ws.on("message", (message) => {
      console.log("Received message from client:", message.toString("utf8"));
      ws.send(message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.delete(ws);
    });
  });

  wss.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });
}

module.exports = setupWebSocketServer;
