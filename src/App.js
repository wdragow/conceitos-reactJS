import React,{ useState, useEffect } from "react";
import { DeleteForeverOutlined, AddCircleOutlineOutlined } from '@material-ui/icons';
import { Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `Novo repositório`,
      url: "https://github.com/wdragow/conceitos-node.js",
      techs: ["Node.js", "ReactJS"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
      <Container>
        <Row className="justify-content-center">
            <button onClick={handleAddRepository}>
              Adicionar
              <AddCircleOutlineOutlined/>
            </button>
        </Row>
        <Row className="justify-content-center">
          <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                <h4>{repository.title}</h4>      
                <a href={repository.url}>GitHub</a> 
                <div>                
                  {repository.techs.map(tech => (
                    <h6 key={tech}>| {tech} |</h6>
                  ))}
                </div>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                  <DeleteForeverOutlined/>
                </button>             
              </li>
            ))}
          </ul>
        </Row>
      </Container>
  );
}

export default App;
