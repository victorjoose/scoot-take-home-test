const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = 3000;

app.use(express.json());
app.use(cors());

const TODOS_FILE_PATH = './todos.json';

const readTodosFromFile = () => {
  try {
    const todosData = fs.readFileSync(TODOS_FILE_PATH, 'utf8');
    return JSON.parse(todosData);
  } catch (error) {
    return [];
  }
};

const writeTodosToFile = (todos) => {
  fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2), 'utf8');
};

let todos = readTodosFromFile();

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = uuidv4();
  todos.push(newTodo);
  
  writeTodosToFile(todos);

  res.json(newTodo);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;

  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = updatedTodo;

    writeTodosToFile(todos);

    res.json(updatedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);

    writeTodosToFile(todos);

    res.json({ message: 'Todo deleted successfully' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
