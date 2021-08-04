import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Header from './Header';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';
import EditTask from './EditTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTaskHandler = async (task) => {
    const request = {
      id: uuidv4(),
      ...task
    }
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await res.json()
    setTasks([...tasks, data]);
  }

  const removeTaskHandler = async (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(newTaskList)
      : alert('Error Deleting This Task')
  }

  const updateTaskHandler = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === data.id ? { ...data } : task
      )
    )
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== '') {
      const newTaskList = tasks.filter((task) => {
        return Object.values(task)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      })
      setSearchResults(newTaskList);
    } else {
      setSearchResults(tasks);
    }
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  useEffect(() => {
    const getAllTasks = async () => {
      const tasksFromServer = await fetchTasks()
      if (tasksFromServer) setTasks(tasksFromServer)
    }

    getAllTasks()
  }, []);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Switch>
          <Route
            path='/'
            exact
            render={(props) => (
              <TaskList
                tasks={searchTerm.length < 1 ? tasks : searchResults}
                getTaskId={removeTaskHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
                toggleReminder={toggleReminder}
              />
            )} />
          <Route
            path='/add'
            render={(props) => (
              <AddTask addTaskHandler={addTaskHandler}
              />
            )} />
          <Route
            path='/edit'
            render={(props) => (
              <EditTask updateTaskHandler={updateTaskHandler}
              />
            )} />
        </Switch>
      </Router>
    </div>
  );
}

export default App
