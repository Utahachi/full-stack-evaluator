import React, { useState, useEffect } from "react";
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from "./components/TaskForm";
import { getTasks } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>

      {/* Pass fetchTasks as callback so TaskForm can refresh list */}
      <TaskForm onTaskCreated={fetchTasks} />

      {/* Pass tasks and refresh callback to TaskList */}
      {loading ? <p>Loading tasks…</p> :
        <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />}
    </div>
  );
}

export default App;
