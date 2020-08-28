import React, { useState, useEffect } from 'react';
import './Task.css';
import Header from '../header/Header';
import api from '../services/api';

import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function Task({history, match}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        
        if(!title || !description){
            alert('Favor preencher Titulo e Descrição da tarefa!');
            return false;
        }

        if (match.params.action === 'edit'){
            const response = await api.put('/task',{
                id,
                title,
                description                
            });  
        } else {
            const response = await api.post('/task',{
                title,
                description,
                state: false
            });            
        }

        history.push('/');        
    };    

    useEffect(()=> {        
        async function fetchTask(){
            if(match.params.id !== 0){
                const response = await api.get(`/task/${match.params.id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setId(response.data._id);
            }
        }

        fetchTask();
    },[match.params.id]);
    
    return ( 
      <div>
            <Header/>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicTitulo">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Titulo da Tarefa" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                    />                        
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            row="3" 
                            placeholder="Descrição da Tarefa"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Button variant="success" type="submit">
                        <FontAwesomeIcon icon={faCheck} /> Salvar
                    </Button>
                    <Button variant="danger" onClick={() => {history.goBack()}}>
                        <FontAwesomeIcon icon={faTimes} /> Cancelar
                    </Button>
                </Form>
            </Container> 
      </div>       
    );
  }
  
  export default Task;
  