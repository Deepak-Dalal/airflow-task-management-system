const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addNewTask(taskId, text, priority) {
  tasks.push({ taskId, text, priority });
}

app.get('/tasks/add', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);
  addNewTask(taskId, text, priority);
  res.json(tasks);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

function sortByPriority(taskA, taskB) {
  return taskA.priority - taskB.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  tasks.sort(sortByPriority);
  res.json(tasks);
});

function editPriority(taskId, priority) {
  const taskToEdit = tasks.find((task) => task.taskId === taskId);
  if (taskToEdit) {
    taskToEdit.priority = priority;
  }
}

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);
  editPriority(taskId, priority);
  res.json(tasks);
});

function updateText(taskId, text) {
  const taskToEdit = tasks.find((task) => task.taskId === taskId);
  if (taskToEdit) {
    taskToEdit.text = text;
  }
}

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  updateText(taskId, text);
  res.json(tasks);
});

function deleteTask(taskId) {
  return tasks.filter((task) => task.taskId !== taskId);
}

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  tasks = deleteTask(taskId);
  res.json(tasks);
});

function filterByPriority(priority) {
  return tasks.filter((task) => task.priority === priority);
}

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);
  const result = filterByPriority(priority);
  res.json(result);
});

app.get('/', (req, res) => {
  res.send('Welcome to AirFlow Task Management System');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
