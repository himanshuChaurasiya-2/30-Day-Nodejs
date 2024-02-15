const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const headers = req.headers;
  const body = req.body;

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log("Headers:", headers);
  console.log("Body:", body);

  next();
}

app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.send("hello to all");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
