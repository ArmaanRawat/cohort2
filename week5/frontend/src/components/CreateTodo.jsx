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
      alert("Todo added Successfully");
      setTitle("");
      setDescription("");
      // Call the refresh function to update the todos list
      if (onTodoCreated) {
        onTodoCreated();
      }
    });
  };

  return (
    <div>
      <input
        style={{ padding: "10px", margin: "10px" }}
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        style={{ padding: "10px", margin: "10px" }}
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button
        style={{ padding: "10px", margin: "10px" }}
        onClick={handleAddTodo}>
        Add a Todo
      </button>
    </div>
  );
}
