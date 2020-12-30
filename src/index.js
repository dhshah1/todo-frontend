import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TodoListContextProvider from "./contexts/TodoListsContext";
import TodoItemsContextProvider from "./contexts/TodoItemsContext";
import UserContextProvider from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <TodoListContextProvider>
        <TodoItemsContextProvider>
          <App />
        </TodoItemsContextProvider>
      </TodoListContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
