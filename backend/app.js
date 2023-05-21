const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
mongoose.connect("mongodb://localhost:27017/TODO_App", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define the task schema and model
const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedTime: { type: Date },
  creationTime: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new Task({ task });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Assuming you're using Mongoose for the database
    await Task.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
