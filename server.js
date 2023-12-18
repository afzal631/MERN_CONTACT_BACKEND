const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your client's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  // optionsSuccessStatus: 204,
};
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());

const Port = process.env.PORT || 5000;

// app.get('/contact/api', (req, res) =>{
//     res.status(200).json({message : "Get all contacts"})
// })
app.use(express.json()); // used as middleware for parsing the body of data sent by client to out api
app.use("/api/contacts", require("./routes/contactRoute")); //this act as a middleware for all the routes
app.use("/user", require("./routes/userRoutes")); //this act as a middleware for all the routes
app.use(errorHandler); //custom middleware for error handling



app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
