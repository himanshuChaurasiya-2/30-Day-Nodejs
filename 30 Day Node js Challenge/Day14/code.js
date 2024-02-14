const express = require("express");
const app = express();

// Cache object to store responses
const cache = {};

function cachingMiddleware(req, res, next) {
  const url = req.originalUrl || req.url;

  if (cache[url]) {
    const { response, expiresAt } = cache[url];
    // Check if the cached response is still valid
    if (expiresAt > Date.now()) {
      // Return cached response
      res.send(response);
      return;
    } else {
      // Remove expired cache entry
      delete cache[url];
    }
  }

  // Override res.send to cache the response before sending it
  const originalSend = res.send;
  res.send = function (body) {
    cache[url] = {
      response: body,
      expiresAt: Date.now() + 5 * 1000, // Cache expiration time (e.g., 5 seconds)
    };
    originalSend.call(this, body);
  };

  // Proceed to the next middleware
  next();
}

// Apply caching middleware to all routes
app.use(cachingMiddleware);

// Example route
app.get("/example", (req, res) => {
  // Simulate some heavy processing
  setTimeout(() => {
    res.send("Response from /example route");
    console.log(cache);
  }, 1000);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
