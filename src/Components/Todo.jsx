import React from "react";
import TodoList from "./TodoList";

const Todo = () => {
  const [inputValue, setInputvalue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [error, setError] = React.useState(false);

  const getTodos = () => {
    setLoading(true);
    fetch(`http://localhost:8080/todos`)
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        setError(true);
        setTodos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  const addTodo = () => {
    // making a post requesting and saving the todo there ?
    const payload = {
      title: inputValue,
      status: false
    };
    setLoading(true);
    fetch(`http://localhost:8080/todos`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setError(false);
        return getTodos();
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Error</h1>
  ) : (
    <div>
      <h1>TODO LIST USING JSON SERVER</h1>
      <input
        placeholder="Add A New TODO"
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <button onClick={addTodo}>ADD TO DO</button>

      <br />
      <TodoList todos={todos}/>

      {/* {todos.map((todo) => (
        <h1 key={todo.id}>{todo.title}</h1>
      ))} */}
    </div>
  );
};

export { Todo };
