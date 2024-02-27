const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

mongoose
  .connect("mongodb://0.0.0.0.:27017/challenge", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to Database", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

async function authenticateAndAuthorize(req, res, next) {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Missing username, password, or role" });
  }

  try {
    const user = await User.findOne({ username, password, role });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = user;

    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.error("Error authenticating and authorizing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = new User({
    username,
    password,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/dashboard", authenticateAndAuthorize, (req, res) => {
  res.json({ message: "Welcome to admin dashboard!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
