const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    name: {
      type: "String",
      required: [true, "Please add the contact name"],
    },
    email: {
      type: "String",
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: "Number",
      required: [true, "Please add the contact phone number"],
    },
    comapny: {
      type: "String",
      // required: [true, "please enter your password"],
    },
    title: {
      type: "String",
      // required: [true, "please enter your password"],
    },
    group: {
      type: "String",
      // required: [true, "please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
