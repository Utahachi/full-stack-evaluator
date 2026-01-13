import React, { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ onSubmit, onTaskCreated }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      // If onSubmit is provided, use it (custom handling)
      if (onSubmit) {
        onSubmit({ title });
      } else {
        // Otherwise, call the API directly
        await createTask({ title, isDone: false, userId: 1 }); // adjust userId if needed
        if (onTaskCreated) onTaskCreated(); // refresh list in parent
      }

      setTitle(""); // clear input
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
