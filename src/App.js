import "./styles.css";
import { useState } from "react";

const AddTodo = (props) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    if (e.target.value != "") setTodo(e.target.value);
  };

  const addTodo = () => {
    if (todo) {
      props.setTodos((prev) => [
        ...prev,
        { id: new Date().toString(), title: todo, completed: false },
      ]);
    }

    setTodo("");
  };

  return (
    <div className="todo__add">
      <div>
        <input
          type="text"
          value={todo}
          placeholder="add a new task..."
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={addTodo}>+</button>
      </div>
    </div>
  );
};

const Todo = (props) => {
  const handleChecked = (id) => {
    props.setTodos((prev) => {
      return (
        prev.length &&
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    });
  };
  return (
    <div className="todo">
      <h2>What's Up!</h2>
      <p>Your Personal Task Manager</p>

      <AddTodo setTodos={props.setTodos} />

      {props.todos.length > 0 &&
        props.todos.map((todo) => {
          return (
            <div className="todo__list" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleChecked(todo.id)}
              />
              <p className={todo.completed ? "strike" : ""}>{todo.title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "test", completed: false },
  ]);
  return (
    <div className="App">
      <Todo todos={todos} setTodos={setTodos} />
    </div>
  );
}
