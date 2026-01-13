import React, { useState, useEffect } from "react";
import './App.css';                 // styles for the app
import TaskList from './components/TaskList';  // component that fetches and displays tasks
import TaskForm from "./components/TaskForm";  // form to create new task

function App() {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>

      {/* Form to create new task */}
      <TaskForm onTaskCreated={fetchTasks} />

      {/* Task list component */}
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
