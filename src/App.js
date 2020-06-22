import React, {useState, useEffect} from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      
    setRepositories(response.data)
  });
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Front-end com ReactJs',
      url: 'https://github.com/Eduildo/desafio-conceito-do-react',
      techs: 'React',
      likes: 0
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);

   
    // TODO
  }

  /*async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    repositories.splice(repositories.findIndex(x => x.id === id), 1)
    setRepositories([...repositories]);
  } */

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    repositories.splice(repositories.findIndex(repository => repository.id === id));
    setRepositories([...repositories]);

    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
      
        <li key={repository.id}>
        {repository.title}

        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
