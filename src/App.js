import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const API = "https://to-do-app-backend-1-4g4j.onrender.com/api/todos";

  // Fetch tasks
  useEffect(() => {
    axios.get(API)
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add task
  const addTask = () => {
    axios.post(API, { task })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));
    setTask("");
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Simple MERN Todo App</h1>

      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter task" 
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTask(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
