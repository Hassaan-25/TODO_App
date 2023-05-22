const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  task: String,
  completed: Boolean,
  creationTime: Date,
  completedTime: Date
});

module.exports = mongoose.model("Tasks", TaskSchema);
