const express = require("express");
const app = express();
const { PORT, MONGO_URI } = require("./config/key");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//MongoDB connection
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
//SCHEMAS
require("./models/loan");
require("./models/book");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./router/loan"));
app.use(require("./router/book"));

//PORT
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Error" + err);
  } else {
    console.log("Server in running on port: " + PORT);
  }
});
