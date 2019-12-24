const express = require("express");
const app = express();
const PORT = 3006;
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const userController = require("./controllers/users");

//==============================
//     MONGOOSE CONNECTION
//==============================

// ERROR
mongoose.connection.on("error", error =>
  console.log(error.message + " is Mongod not running?")
);

// DISCONNECTED
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

// CONNECT
mongoose.connect("mongodb://localhost:27017/medicaldatabase", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
// CONNECTED
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  }
};

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

// controllers
app.use("/user", userController);

app.listen(PORT, () => {
  console.log("listening to port:", PORT);
});
