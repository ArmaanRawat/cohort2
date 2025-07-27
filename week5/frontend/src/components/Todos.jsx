/*
todos = [{
    title: "test title",
    description: "test description",
    completed: false,
    id: 1,
}]
*/
const handleDelete = (todo, onTodoDeleted) => {
  try {
    fetch("http://localhost:3000/deleteTodo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo._id,
      }),
    }).then(async function (res) {
      const json = await res.json();
      alert("Todo should have been deleted");
      // Call the refresh function to update the todos list
      if (onTodoDeleted) {
        onTodoDeleted();
      }
    });
  } catch (error) {
    console.log("oh man what is this with delete functionality.");
  }
};

const handleComplete = (todo, onTodoDeleted) => {
  try {
    fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo._id,
      }),
    }).then(async function (res) {
      const json = await res.json();
      alert("Todo marked as completed");
      // Call the refresh function to update the todos list
      if (onTodoDeleted) {
        onTodoDeleted();
      }
    });
  } catch (error) {
    console.log("Error marking todo as completed:", error);
  }
};

export function Todos({ todos, onTodoDeleted }) {
  return todos.map((todo) => (
    <div key={todo._id}>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <button
        onClick={() => handleComplete(todo, onTodoDeleted)}
        disabled={todo.completed}
        style={{
          backgroundColor: todo.completed ? "#4CAF50" : "#f0f0f0",
          color: todo.completed ? "white" : "black",
        }}>
        {todo.completed ? "Completed" : "Mark as completed"}
      </button>
      <button onClick={() => handleDelete(todo, onTodoDeleted)}>Delete</button>
    </div>
  ));
}
