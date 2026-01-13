import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5215/tasks')
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks');
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.title} - {task.isDone ? 'Done' : 'Pending'}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
