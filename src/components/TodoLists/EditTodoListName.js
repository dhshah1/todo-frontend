import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTodoLists } from "../../contexts/TodoListsContext";

/*
Renders a text field so that the name of the todolist can be edited
*/

const EditTodoListName = ({ todoList, setEditMode, setTodoListName }) => {
  const [editedTodoList, setEditedTodoList] = useState(todoList);
  const { handleUpdate } = useTodoLists();
  return (
    <ListItem key={todoList.id}>
      <TextField
        value={editedTodoList.name}
        onChange={(e) =>
          setEditedTodoList({ ...editedTodoList, name: e.target.value })
        }
        onKeyPress={(e) => {
          if (e.key == "Enter" && editedTodoList !== "") {
            handleUpdate(editedTodoList);
            setTodoListName(editedTodoList.name);
            setEditMode(false);
          }
        }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (editedTodoList !== "") {
                    handleUpdate(editedTodoList);
                    setTodoListName(editedTodoList.name);
                    setEditMode(false);
                  }
                }}
              >
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </ListItem>
  );
};

export default EditTodoListName;
