import React, { useState, useEffect } from 'react';
import './Tasklist.css';
import Header from '../header/Header';
import api from '../services/api';

import { Button, Col, Container, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus, faPlus, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

function Tasklist({ history }) {    		
	const [ tasks , setTasks ] = useState([]);	

	const fetchTasks = async () => {
		const response = await api.get('/task');
		setTasks(response.data);			
	}

	useEffect(() => {		
		fetchTasks();	
	}, []);

	async function handleDelete(id){		
		await api.delete('/task', {params: {id: id}});
		setTasks(tasks.filter(task => task._id !== id));
	};

	async function handleDoneTask(id, state){				
		await api.put('/task', {
			id,
			state: !state
		});

		fetchTasks();
	};
		
  	return ( 
		<div>
			<Header/>
			<Container>
				<Row>
					<Col md={{ span: 2, offset: 10 }} className="mb-3 pr-0">					
						<Button 
							variant="outline-success" 
							className="float-right add-task" 
							onClick={() => {history.push('task/add/0')}}
						>
								<FontAwesomeIcon icon={faPlus} /> Adicionar
						</Button>										
					</Col>
				</Row>
				<Row>
					
						{tasks.length > 0 ? (
							<ul className="list-items">
								{tasks.map(task => (
									<li key={task._id} className={task.state? 'task-done':''}>
										<Row>
											<Col>
												<p><strong>Titulo:</strong>&nbsp;{task.title}</p>
												<p><strong>Descrição:</strong>&nbsp;{task.description}</p>
											</Col>
											<Col className="actions">
												<Button  
													title="Concluir" 
													variant="outline-success"
													onClick={() => { 
														if(task.state){
															if (window.confirm('Deseja desmarcar está tarefa?')){
																handleDoneTask(task._id, task.state)
															}
														}
														handleDoneTask(task._id, task.state);
													}}
												>
													<FontAwesomeIcon icon={faCheckDouble} />
												</Button>
												<Button  
													title="Editar" 
													variant="outline-info"
													onClick={() => {history.push(`task/edit/${task._id}`)}}
												>
													<FontAwesomeIcon icon={faEdit} />
												</Button>
												<Button 
													title="Excluir" 
													variant="outline-danger"
													onClick={() => {if(window.confirm('Deseja deletar está tarefa?')){handleDelete(task._id)} }}
													>
														<FontAwesomeIcon icon={faMinus} />
												</Button>
											</Col>					
										</Row>
									</li>
								))}	
							</ul>
						): (
							<div className="empty"> <p>Não possui tarefas cadastradas!</p></div>
						)}											

					

					
				</Row>
			</Container> 
		</div>       
	);
}

export default Tasklist;
