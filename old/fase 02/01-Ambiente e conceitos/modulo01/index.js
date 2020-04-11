const express = require('express');

const server = express();
const port = 3000;

server.use(express.json());
server.listen(port);

const users = []

function checkIfUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" })
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'user does not exists' })
  }

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users)
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkIfUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.status(200).json({ ok: "Success!" });
});

