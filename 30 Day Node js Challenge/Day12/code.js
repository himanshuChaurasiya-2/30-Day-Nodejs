const express = require("express");
const app = express();

// Object to store request counts for each IP address
const requestCounts = {};

// Rate limiting middleware
app.use((req, res, next) => {
  const ip = req.ip;
  const maxRequestsPerMinute = 1; // Maximum requests allowed per minute

  // Check if IP is already being rate-limited
  if (!requestCounts[ip]) {
    requestCounts[ip] = 1;
  } else {
    requestCounts[ip]++;
  }

  // Check if request count exceeds the limit
  if (requestCounts[ip] > maxRequestsPerMinute) {
    return res.status(429).send("Too Many Requests");
  }

  // Reset request count after a minute
  setTimeout(() => {
    delete requestCounts[ip];
  }, 5000);

  // Allow the request to proceed
  next();
});

// Route handlers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
