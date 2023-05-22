var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const cors = require("cors");
const corsOptions = {
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tasksRouter = require("./routes/tasks");

var app = express();
app.use(express.json());
app.use("/tasks", tasksRouter);
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
module.exports = app;
