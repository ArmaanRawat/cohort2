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

  return (
    <>
      <CreateTodo onTodoCreated={fetchTodos} />
      <Todos todos={todos} onTodoDeleted={fetchTodos} />
    </>
  );
}

export default App;
