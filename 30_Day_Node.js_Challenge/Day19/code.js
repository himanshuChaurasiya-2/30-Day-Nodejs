const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0.:27017/challenge", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `\n${props.value} is not a valid email address!\n`,
    },
  },
});

const User = mongoose.model("User", userSchema);

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("\nUser added successfully!");
  } catch (error) {
    console.error("\nError adding user:", error.message);
  }
}

addUserWithValidation({ username: "john_doe", email: "invalid-email" });
addUserWithValidation({ username: "john_doe", email: "hitam@gmail.com" });
addUserWithValidation({ username: "john_doe", email: "hitm@gmail.com" });
