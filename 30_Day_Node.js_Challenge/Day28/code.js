const http = require("http");
const express = require("express");
const setupWebSocketServer = require("./code2");

const app = express();
const server = http.createServer(app);

setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
