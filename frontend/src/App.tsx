import { useEffect, useState } from 'react'
import TaskCardComponent from './components/task-card-component';
import styled from 'styled-components';
import TaskForm from './components/task-form';
import { GlobalStyle } from './styles/global-styles';
import { Button } from './styles/global-styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  max-height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
`
const TaskCardContainer = styled.div`
  height: 80%;
`

const ButtonContainer = styled.div`
  margin-top: 20px;
  padding-right: 20px;
  width: 420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: white;
  margin: 20px;
`

const App = (): JSX.Element => {

  const [allTasks, setAllTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({open: false, data: null})
  
  const loadTasks = async() => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/tasks');
      const data = await response.json();
      setAllTasks(data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTasks();
  }, [])

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {taskForm.open && <TaskForm loadTasks={loadTasks} taskForm={taskForm} setTaskForm={setTaskForm}/>}
        <Title>All Tasks</Title>

        <TasksContainer>
          <ButtonContainer>
            <Button onClick={() => setTaskForm({open: true, data: null})}>New Task</Button>
          </ButtonContainer>
          <TaskCardContainer>
            {allTasks && allTasks.map((taskData: any) => (
              <TaskCardComponent key={taskData.id} loadTasks={loadTasks} taskData={taskData} setTaskForm={setTaskForm}/>
            ))}
          </TaskCardContainer>
        </TasksContainer>
      </AppContainer>
    </>

  )
}

export default App
