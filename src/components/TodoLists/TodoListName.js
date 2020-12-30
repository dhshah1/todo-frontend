import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditTodoListName from "./EditTodoListName";
import { useTodoLists } from "../../contexts/TodoListsContext";

/*
Renders a single todo list name
Has buttons for users to edit or delete it 
*/
const TodoListName = ({ todoList }) => {
  const { currTodoList, setCurrTodoList, handleDelete } = useTodoLists();
  const [todoListName, setTodoListName] = useState(todoList.name);
  const [editMode, setEditMode] = useState(false);

  if (editMode)
    return (
      <EditTodoListName
        todoList={todoList}
        setEditMode={setEditMode}
        setTodoListName={setTodoListName}
      />
    );

  return (
    <ListItem
      button
      selected={todoList.id === (currTodoList ? currTodoList.id : null)}
      onClick={() => setCurrTodoList(todoList)}
    >
      <ListItemText
        primary={todoListName}
        primaryTypographyProps={{ noWrap: true }}
      />
      <ListItemIcon>
        <IconButton onClick={() => setEditMode(true)}>
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            handleDelete(todoList.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListName;
