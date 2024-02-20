const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0.:27017/challenge", {
  //useNewUrlParser: true, //useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind("MongoDB connection error:"));
db.once("open", () => {
  console.log("\nConnected to MongoDB");
});

const user = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("User", user);

app.post("/data", async (req, res) => {
  try {
    const { name, age } = req.body;
    const Data = new User({ name, age });
    await Data.save();
    res.status(201).json(Data);
    console.log(Data);
  } catch (error) {
    console.error("\nError creating test document:", error);
    res.status(500).json({ error: "\nInternal server error" });
  }
});

app.get("/average-age", async (req, res) => {
  try {
    const result = await User.aggregate([
      { $group: { _id: null, averageAge: { $avg: "$age" } } },
    ]);

    const averageAge = result[0].averageAge;

    res.json({ averageAge });
  } catch (error) {
    console.error("\nError calculating average age:", error);
    res.status(500).json({ error: "\nInternal server error" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}`);
});
