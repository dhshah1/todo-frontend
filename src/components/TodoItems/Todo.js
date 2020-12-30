import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTodo from "./EditTodo";
import { useTodoItems } from "../../contexts/TodoItemsContext";

/* 
Handles rendering of a single TodoItem 
Maintains editMode state, so that edit dialog can be conditionally rendered
*/

const Todo = ({ todoListId, ...initialTodoItem }) => {
  const [todoItem, setTodoItem] = useState(initialTodoItem);
  const [editMode, setEditMode] = useState(false);
  const { handleUpdate, handleDelete } = useTodoItems();

  const markComplete = () => {
    setTodoItem((prevTodoItem) => {
      const newTodoItem = {
        ...prevTodoItem,
        completed: !prevTodoItem.completed,
      };
      handleUpdate(newTodoItem);
      return newTodoItem;
    });
  };

  return (
    <ListItem
      button
      divider
      disableRipple
      style={{ textDecoration: todoItem.completed ? "line-through" : "none" }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todoItem.completed}
          disableRipple
          onClick={markComplete}
        />
      </ListItemIcon>
      <ListItemText
        primary={todoItem.title}
        secondary={todoItem.body}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemIcon>
        <IconButton onClick={() => setEditMode(true)}>
          <EditIcon />
        </IconButton>
        {editMode ? (
          <EditTodo
            todoItem={todoItem}
            setTodoItem={setTodoItem}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : null}
      </ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={() => handleDelete(todoItem.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Todo;
