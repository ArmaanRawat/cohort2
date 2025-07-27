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
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3 className="empty-title">No todos yet</h3>
        <p className="empty-description">
          Create your first todo to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="todos-grid">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`todo-card ${todo.completed ? "completed" : ""}`}>
          <div className="todo-header">
            <h3 className="todo-title">{todo.title}</h3>
            <div
              className={`todo-status ${
                todo.completed ? "completed" : "pending"
              }`}>
              {todo.completed ? "✅" : "⏳"}
            </div>
          </div>

          <p className="todo-description">{todo.description}</p>

          <div className="todo-actions">
            <button
              className={`complete-button ${todo.completed ? "completed" : ""}`}
              onClick={() => handleComplete(todo, onTodoDeleted)}
              disabled={todo.completed}>
              {todo.completed ? "Completed" : "Mark Complete"}
            </button>

            <button
              className="delete-button"
              onClick={() => handleDelete(todo, onTodoDeleted)}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
