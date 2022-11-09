const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

dotenv.config();

const route = require("./routes/index");
// db
mongoose.connect(process.env.MONGO_DB, function (err) {
  if (!err) {
    console.log("Connect successfull");
  } else {
    console.log(err);
  }
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(cors());
// app.use(logger("dev"));
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.listen(() => {
  console.log(`Server is running on ${process.env.PORT}`);
})

route(app);
module.exports = app;