import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTodos(res.data));
  }, []);

  // Add task
  const addTask = () => {
    axios.post("http://localhost:5000/api/todos", { task })
      .then(res => setTodos([...todos, res.data]));
    setTask("");
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)));
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
