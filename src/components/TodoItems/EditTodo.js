import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTodoItems } from "../../contexts/TodoItemsContext";

/*
Dialog which handles editing of current TodoItem
*/

const EditTodo = ({ todoItem, setTodoItem, editMode, setEditMode }) => {
  const [currentTodoItem, setCurrentTodoItem] = useState({
    id: todoItem.id,
    title: todoItem.title,
    body: todoItem.body,
    completed: todoItem.completed,
    complete_by: new Date(todoItem.complete_by).toISOString().split("T")[0],
  });

  const { handleUpdate } = useTodoItems();

  const handleChange = (e) => {
    setCurrentTodoItem((prevTodoItem) => {
      return { ...prevTodoItem, [e.target.name]: e.target.value };
    });
  };

  const editTodo = () => {
    setEditMode(false);
    setTodoItem(currentTodoItem);
    handleUpdate(currentTodoItem);
  };

  return (
    <Dialog open={editMode} onClose={() => setEditMode(false)}>
      <DialogTitle>Todo Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Task Description"
          type="text"
          inputProps={{ maxLength: 30 }}
          defaultValue={currentTodoItem.title}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="body"
          label="Task Details"
          type="text"
          defaultValue={currentTodoItem.body}
          fullWidth
          multiline
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="complete_by"
          label="Deadline"
          defaultValue={currentTodoItem.complete_by}
          type="date"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditMode(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={editTodo} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodo;
