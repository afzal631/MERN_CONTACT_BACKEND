const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: "String",
      required: [true, "please enter your username"],
    },
    email: {
      type: "String",
      required: [true, "please enter your name"],
    },
    password: {
      type: "String",
      required: [true, "please enter your password"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
