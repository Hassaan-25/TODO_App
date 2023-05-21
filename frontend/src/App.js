import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchTasks } from "./helpers/api";
import axiosInstance from "./helpers/api.config";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await axiosInstance.post("/tasks", {
        task: newTask,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="app-container">
      <h1>TODO App</h1>
      <div className="input-container">
        <input
          type="text"
          className="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a task..."
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span className="task-text">{task.task}</span>
            <button
              className="delete-button"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
