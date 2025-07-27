import { useState } from "react";

export function CreateTodo({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(async function (res) {
      const json = await res.json();
      setTitle("");
      setDescription("");
      // Call the refresh function to update the todos list
      if (onTodoCreated) {
        onTodoCreated();
      }
    });
  };

  return (
    <div className="create-todo-container">
      <h3 className="create-todo-title">➕ Create New Todo</h3>
      <p className="create-todo-subtitle">Add a new task to your list</p>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          placeholder="Enter todo description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <button
        className="create-todo-button"
        onClick={handleAddTodo}
        disabled={!title.trim() || !description.trim()}>
        ✨ Add Todo
      </button>
    </div>
  );
}
