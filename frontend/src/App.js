import React, { useState, useEffect } from "react";
import { isToday, isYesterday, isTomorrow, format } from "date-fns";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  ListGroup,
  Dropdown,
  Form,
  Accordion,
  Card,
} from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axiosInstance from "./helpers/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isToday(date)) {
      return "today";
    } else if (isYesterday(date)) {
      return "yesterday";
    } else if (isTomorrow(date)) {
      return "tomorrow";
    } else {
      // Format the date to a string if it's not today, yesterday, or tomorrow
      return format(date, "yyyy-MM-dd");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axiosInstance.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (task) {
      const newTask = {
        task,
        completed: false,
        creationTime: new Date(),
      };
      const res = await axiosInstance.post("/tasks", newTask);
      setTasks([...tasks, res.data]);
      setTask("");
    }
  };

  const deleteTask = async (id) => {
    await axiosInstance.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const completeTask = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    taskToUpdate.completed = !taskToUpdate.completed;
    await axiosInstance.put(`/tasks/${id}`, taskToUpdate);
    setTasks([...tasks]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  // Group tasks by date
  const tasksByDate = tasks.reduce((groups, task) => {
    const date = task.creationTime.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});

  const taskDates = Object.keys(tasksByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <Container>
      <Row>
        <Col md={{ span: "6", offset: "3" }}>
          <InputGroup className="mb-3 todo-input">
            <FormControl
              placeholder="Add a task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={addTask} className="add-button">
              Add
            </Button>
          </InputGroup>

          <Accordion defaultActiveKey="0">
            {taskDates.map((date, idx) => (
              <Card className="todo-body-list-card">
                <Accordion.Header as={Card.Header} eventKey={idx.toString()}>
                  To do on {formatDate(date)}
                </Accordion.Header>
                <Accordion.Body
                  eventKey={idx.toString()}
                  className="todo-body-list"
                >
                  <ListGroup>
                    {tasksByDate[date].map((task) => (
                      <ListGroup.Item
                        key={task._id}
                        className="todo-items d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <Form.Check
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => completeTask(task._id)}
                            className="d-inline rounded-checkbox"
                          />
                          {task.task}
                        </div>
                        <Dropdown align="end" className="d-inline right">
                          <Dropdown.Toggle variant="none" id="dropdown-basic">
                            ⫶⫶⫶
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => deleteTask(task._id)}>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Card>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
