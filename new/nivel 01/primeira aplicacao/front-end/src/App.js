import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';

import './App.css';


function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Renan Fermino',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
  return (
    <>
      <Header title="HomePage" />
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      <br />
    </>
  )
};

export default App;