const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const newTask = new Task({
    task: req.body.task,
    completed: req.body.completed,
    creationTime: req.body.creationTime
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
});

router.delete("/:id", async (req, res) => {
  const removedTask = await Task.deleteOne({ _id: req.params.id });
  res.json(removedTask);
});

router.put("/:id", async (req, res) => {
  const updatedTask = await Task.updateOne(
    { _id: req.params.id },
    { $set: { completed: req.body.completed } }
  );
  res.json(updatedTask);
});
module.exports = router;
