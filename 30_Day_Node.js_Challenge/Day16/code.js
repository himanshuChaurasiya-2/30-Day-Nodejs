const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const connectionString = "mongodb://0.0.0.0.:27017/challenge";

function connectToMongoDB() {
  mongoose.connect(connectionString);
  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("MongoDB connected successfully.");
  });
}

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const TestModel = mongoose.model("Test", TestSchema);

app.post("/data", async (req, res) => {
  try {
    const { name, age } = req.body;
    const test = new TestModel({ name, age });
    await test.save();
    res.status(201).json(test);
    console.log(test);
  } catch (error) {
    console.error("Error creating test document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
