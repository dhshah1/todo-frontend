import React, { useState, createContext, useContext } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

/*
Context for todoLists, so that the state can be shared easily among all the components.
Maintains all todo lists the user has. 
Also maintains the todo list the user has currently selected
Contains methods that handle all CRUD API requests for todo lists
*/

const TodoListsContext = createContext();

const TodoListContextProvider = (props) => {
  const [todoLists, setTodoLists] = useState([]);
  const [currTodoList, setCurrTodoList] = useState();
  const [tags, setTags] = useState([]);
  const { setToken } = useUser();

  const URL = "http://localhost:3001/todo_lists";

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status === 401) {
        setToken(null);
      }
      return Promise.reject(err);
    }
  );

  const getTodoLists = () => {
    axios.get(URL).then((res) => {
      setTodoLists(res.data);
      setCurrTodoList(res.data[0]);
      let currtags = [];
      if (res.data[0].tags) {
        currtags = res.data[0].tags.map((tag) => tag.name);
      }
      setTags(currtags);
    });
  };

  const handleAdd = (todoList) => {
    axios
      .post(URL, { todo_list: { ...todoList } })
      .then((res) => setTodoLists((todoLists) => [...todoLists, res.data]));
  };

  const handleDelete = (todoListId) => {
    axios.delete(`${URL}/${todoListId}`).then((res) => {
      setTodoLists((todoLists) => {
        const newTodoLists = todoLists.filter(
          (todoList) => todoList.id !== todoListId
        );
        if (todoListId === currTodoList.id) {
          setCurrTodoList(newTodoLists ? newTodoLists[0] : null);
        }
        return newTodoLists;
      });
    });
  };

  const handleUpdate = (todoList) => {
    axios.put(`${URL}/${todoList.id}`, { todo_list: { ...todoList } });
  };

  return (
    <TodoListsContext.Provider
      value={{
        todoLists,
        setTodoLists,
        currTodoList,
        setCurrTodoList,
        getTodoLists,
        handleAdd,
        handleDelete,
        handleUpdate,
        tags,
        setTags,
      }}
    >
      {props.children}
    </TodoListsContext.Provider>
  );
};

export const useTodoLists = () => {
  return useContext(TodoListsContext);
};

export default TodoListContextProvider;
