var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://localhost:27017/TODO_App",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const tasksRouter = require("./routes/tasks");

var app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
module.exports = app;
