import React, { useState, useEffect } from "react";
import "./todo.css";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDesc, setNewTodoDesc] = useState("");
  const [newTodoDate, setNewTodoDate] = useState(
    new Date().toLocaleDateString()
  );
  const [currpdId, setcurrpdId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUpdateStart, setIsUpdateStart] = useState(false);

  const handleAddTodo = async () => {
    if (isUpdateStart) {
      await axios
        .post("https://guyal-backend-api-todotask-with-user.onrender.com/todo/update", {
          Todoid: currpdId,
          isCompleted,
          description: newTodoDesc,
          date: new Date().toLocaleDateString(),
          title: newTodoText,
        })
        .then((res) => {

          setIsUpdateStart(false);
          setNewTodoDesc("");
          setNewTodoText("");
        });
    } else {
      if (newTodoText.trim() !== "") {
        await axios
          .post("https://guyal-backend-api-todotask-with-user.onrender.com/todo/create", {
            id: localStorage.getItem("user"),
            isCompleted,
            description: newTodoDesc,
            date: new Date().toLocaleDateString(),
            title: newTodoText,
          })
          .then((res) => {
            setNewTodoDesc("");
            setNewTodoText("");
            alert(res.data.message);
          });
      }
    }
  };

  const handleUpdateTodo = async (item) => {
    setIsUpdateStart(true);
    setNewTodoText(item.title);
    setNewTodoDesc(item.description);
    setcurrpdId(item._id);
  };

  const handleDeleteTodo = async (item) => {
    await axios
      .post("https://guyal-backend-api-todotask-with-user.onrender.com/todo/delete", {
        Todoid: item._id,
      })
      .then((res) => {});
  };

  useEffect(() => {
    const getTodos = async () => {
      await axios
        .post("https://guyal-backend-api-todotask-with-user.onrender.com/todo", { id: localStorage.getItem("user") })
        .then((res) => {
          setTodos(res.data.user.todo);
        });
    };

    getTodos();
  }, [handleAddTodo, handleUpdateTodo, handleDeleteTodo]);

  const handleIsCompletedTodoUpdate = (id) => {};

  return (
    <>
      <div className="container-fluid body ">
        <div className="body">
          <marquee
            className=" row p-3 #00bfa5 teal accent-4
            text-white mb-5 shadow "
          >
            <h6>Add Your Todays Task </h6>
          </marquee>
 
          <div>
            <input
              className="bg-white border text-center "
              type="text"
              placeholder="Title"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <input
              className="bg-white border text-center "
              type="text"
              placeholder="Description"
              value={newTodoDesc}
              onChange={(e) => setNewTodoDesc(e.target.value)}
            />

            <button onClick={() => handleAddTodo()}>Add Todo</button>
          </div>

          <h6 className="text-success  p-2">Add your ToDo!!</h6>
          <ul className="">
            {todos.map((todo) => (
              <li className="mt-4">
                <p>
                  <input type="checkbox" id="" checked={!todo.isCompleted} />
                  <span>
                    {todo.title} : {todo.description}
                  </span>
                </p>
                <p>
                  <button onClick={() => handleUpdateTodo(todo)}>Update</button>
                  <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
