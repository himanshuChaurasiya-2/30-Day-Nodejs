const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secretKey = "hello";

// Middleware to parse JSON bodies
app.use(express.json());

// Authentication middleware
function authenticationMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;
  console.log(token);

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const authToken = token.split(" ")[1];
    // Verify the token
    const decoded = jwt.verify(authToken, secretKey);

    // If token is valid, attach the decoded user information to the request object
    req.user = decoded;
    console.log("verified" + token);
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.log("new " + token);
    // If token verification fails, return 401 Unauthorized
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

// Example protected route
app.get("/protected", authenticationMiddleware, (req, res) => {
  res.json({ message: "Authenticated user", user: req.user, user: req.user });
});

// Example route to generate token (for testing purposes)
app.post("/login", (req, res) => {
  // For simplicity, assume user authentication passed
  // Generate JWT token
  const token = jwt.sign({ username: req.body.username }, secretKey);
  res.json({ token });
});

// Test route without authentication
app.get("/public", (req, res) => {
  res.json({ message: "Public route" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
