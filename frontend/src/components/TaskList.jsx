import React, { useState, useEffect } from "react";
import { deleteTask, updateTask } from "../services/api";
import axios from "axios";

export default function TaskList({ tasks: propsTasks, onTaskUpdated }) {
  const [tasks, setTasks] = useState(propsTasks || []);
  const [loading, setLoading] = useState(!propsTasks);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch tasks if not passed as props
  useEffect(() => {
    if (!propsTasks) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/tasks`)
        .then((res) => setTasks(res.data))
        .catch((err) => {
          console.error("Error fetching tasks:", err);
          setError("Failed to load tasks");
        })
        .finally(() => setLoading(false));
    }
  }, [propsTasks]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (onTaskUpdated) onTaskUpdated(); // refresh parent if needed
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const submitEdit = async (id) => {
    try {
      await updateTask(id, { title: editTitle, isDone: false, userId: 1 }); // adjust userId if needed
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: editTitle } : t))
      );
      setEditingId(null);
      setEditTitle("");
      if (onTaskUpdated) onTaskUpdated(); // refresh parent if needed
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task");
    }
  };

  if (loading) return <p>Loading tasks…</p>;
  if (error) return <div>{error}</div>;
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editingId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => submitEdit(task.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              {task.title} {task.isDone ? "(Done)" : "(Pending)"}
              <button onClick={() => startEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
