import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { useTodoLists } from "../contexts/TodoListsContext";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import TodoListName from "./TodoLists/TodoListName";

/*
Handles rendering of the sidebar in the app, which shows the list of names of the todo lists 
the user has.
Has a text field for adding of new todo list
*/

const Sidebar = (props) => {
  const { todoLists, getTodoLists, handleAdd } = useTodoLists();

  const [newTodoList, setNewTodoList] = useState("");

  useEffect(() => getTodoLists(), []);

  return (
    <List>
      <ListItem>
        <TextField
          value={newTodoList}
          onChange={(e) => setNewTodoList(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && newTodoList !== "") {
              handleAdd({ name: newTodoList });
              setNewTodoList("");
            }
          }}
          fullWidth
          label="New Task List"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (newTodoList !== "") {
                      handleAdd({ name: newTodoList });
                      setNewTodoList("");
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
      {todoLists.map((todoList) => {
        return <TodoListName key={todoList.id} todoList={todoList} />;
      })}
    </List>
  );
};

export default Sidebar;
