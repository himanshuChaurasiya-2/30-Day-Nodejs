const express = require("express");
const path = require("path");

function staticFileServer(req, res) {
  express.static(path.join(__dirname));

  if (req.url === "/") {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", req.url));
  }
}

const app = express();
app.use(staticFileServer);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

