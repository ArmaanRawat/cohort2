import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const json = await response.json();
      setTodos(json.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = todos.length - completedTodos;

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">✨ Todo App</h1>
        <p className="app-subtitle">Organize your life, one task at a time</p>
      </div>

      <div className="app-content">
        <div className="create-todo-section">
          <CreateTodo onTodoCreated={fetchTodos} />
        </div>

        <div className="todos-section">
          <h2 className="todos-title">
            {todos.length === 0
              ? "No todos yet"
              : `Your Todos (${todos.length})`}
          </h2>
          <Todos todos={todos} onTodoDeleted={fetchTodos} />
        </div>
      </div>

      <footer className="footer-section">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-number completed">{completedTodos}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number pending">{pendingTodos}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="footer-info">
          <p className="footer-text">Made with ❤️ for productivity</p>
          <div className="footer-links">
            <span className="footer-link">React</span>
            <span className="footer-link">Express</span>
            <span className="footer-link">MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
