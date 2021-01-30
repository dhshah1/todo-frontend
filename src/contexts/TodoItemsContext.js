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

  const getTodoItems = () => {
    axios
      .get(`${URL}/${currTodoList.id}/todo_items`)
      .then((res) => setTodoItems(res.data));
  };

  // const toggleComplete = (prevTodoItem) => {
  //   console.log(prevTodoItem);
  //   const newTodoItem = {
  //     ...prevTodoItem,
  //     completed: !prevTodoItem.completed,
  //   };
  //   console.log(newTodoItem);
  //   handleUpdate(newTodoItem).then((res) =>
  //     setTodoItems((todoItems) => {
  //       const newTodoItems = todoItems.map((todoItem) => {
  //         if (todoItem.id === prevTodoItem.id) return newTodoItem;
  //         else return todoItem;
  //       });
  //       console.log(newTodoItems);
  //       return newTodoItems;
  //     })
  //   );
  // };

  // const toggleComplete = (prevTodoItem) => {
  //   setTodoItems((prevTodoItems) => {
  //     // return prevTodoItems.map((todoItem) => {
  //     //   if (todoItem.id === prevTodoItem.id) {
  //     //     return { ...prevTodoItem, completed: !prevTodoItem.completed };
  //     //   } else {
  //     //     return todoItem;
  //     //   }
  //     // });
  //     console.log(prevTodoItems);
  //     const newTodoItems = prevTodoItems.map((todoItem) => {
  //       if (prevTodoItem.id === todoItem.id) {
  //         return { ...todoItem, completed: !todoItem.completed };
  //       } else {
  //         return todoItem;
  //       }
  //     });
  //     console.log(newTodoItems);
  //     return newTodoItems;
  //   });
  // };

  const handleAdd = (todoItem) => {
    axios
      .post(`${URL}/${currTodoList.id}/todo_items`, {
        todo_item: { ...todoItem, tag_list: todoItem.tags },
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
      todo_item: { ...todoItem, tag_list: todoItem.tags },
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
