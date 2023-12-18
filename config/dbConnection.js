const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log("Connecting to",process.env.CONNECTION_STRING)
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "connected to DATABASE: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;
