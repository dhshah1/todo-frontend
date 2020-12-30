import React, { useState, createContext, useContext } from "react";
import { useTodoLists } from "./TodoListsContext";
import { useUser } from "./UserContext";
import axios from "axios";

/*
Context for todoItems, so that the state can be shared easily among all the components.
todoItems state will depend on the current todo list user has selected
Also contains methods that handle all CRUD API requests for todo items
*/
const TodoItemsContext = createContext();

const TodoItemsContextProvider = (props) => {
  const [todoItems, setTodoItems] = useState([]);
  const { setToken } = useUser();
  const { currTodoList } = useTodoLists();

  const URL = "http://localhost:3001/todo_lists";

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  });

  axios.interceptors.response.use((response) => {
    if (response.status === 401) {
      setToken(null);
    }
    return response;
  });

  const getTodoItems = () => {
    axios
      .get(`${URL}/${currTodoList.id}/todo_items`)
      .then((res) => setTodoItems(res.data));
  };

  const handleAdd = (todoItem) => {
    axios
      .post(`${URL}/${currTodoList.id}/todo_items`, {
        todo_item: { ...todoItem },
      })
      .then((res) => setTodoItems((todoItems) => [...todoItems, res.data]));
  };

  const handleDelete = (todoId) => {
    axios
      .delete(`${URL}/${currTodoList.id}/todo_items/${todoId}`)
      .then((res) =>
        setTodoItems((todoItems) =>
          todoItems.filter((todoItem) => todoItem.id !== todoId)
        )
      );
  };

  const handleUpdate = (todoItem) => {
    return axios.put(`${URL}/${currTodoList.id}/todo_items/${todoItem.id}`, {
      todo_item: { ...todoItem },
    });
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems,
        setTodoItems,
        getTodoItems,
        handleAdd,
        handleDelete,
        handleUpdate,
      }}
    >
      {props.children}
    </TodoItemsContext.Provider>
  );
};

export const useTodoItems = () => {
  return useContext(TodoItemsContext);
};

export default TodoItemsContextProvider;
