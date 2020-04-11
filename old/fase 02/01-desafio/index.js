const express = require('express');
const server = express();
const port = 3000;

let projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const projectExists = projects.find(project => project.id === id);

  if (!projectExists) {
    return res.status(400).json({ error: "Projetct doesn't exists" })
  }

  return next();
}

function countRequests(req, res, next) {
  console.count("Number of requests")
  return next();
}

server.get('/projects', countRequests, (req, res) => {

  return res.json(projects);
});

server.post('/projects', countRequests, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);
})

server.post('/projects/:id/tasks', checkProjectExists, countRequests, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(project => {
    if (project.id === id) {
      project.tasks.push(title);
    }
    return res.json(project)
  })
})

server.put('/projects/:id', checkProjectExists, countRequests, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id)
  project.title = title;

  return res.json(project);
})

server.delete('/projects/:id', checkProjectExists, countRequests, (req, res) => {
  const { id } = req.params;

  projects = projects.filter(project => !(project.id === id));

  return res.json(projects);
})

server.use(express.json());
server.listen(port);