import React,{ useState, useEffect } from "react";
import { DeleteForeverOutlined, AddCircleOutlineOutlined, GitHub } from '@material-ui/icons';
import { Container, Row } from 'react-bootstrap';
// import swal from 'sweetalert';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title , setTitle] = useState();
  const [url , setURL] = useState();
  const [techs , setTechs] = useState();


  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    // if (title === undefined || url === undefined || techs === undefined) {
    //   return swal("Erro", "Não foi possível adicionar o repositório!", "error");     
    // }

    const response = await api.post('/repositories', {
      title: title,
      url: url,
      techs: techs
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);

    setTitle('');
    setURL('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
      <Container>
        <Row className="justify-content-center inputs">        
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nome do repositório"/>
            <input type="text" value={url} onChange={e => setURL(e.target.value)} placeholder="URL"/>
            <input type="text" value={techs} onChange={e => setTechs(e.target.value)} placeholder="Tecnologias"/>
        </Row>
        <Row className="justify-content-center inputs">
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
                  <div className="justify-content-center">
                      <h6>   {repository.techs}   </h6>
                  </div> 
                  <a href={repository.url}><GitHub/></a>
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
