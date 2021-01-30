import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTodoLists } from "../../contexts/TodoListsContext";
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
    tags: todoItem.tags.map((tag) => {
      return tag.name || tag;
    }),
  });
  const { tags, setTags } = useTodoLists();
  const { handleUpdate } = useTodoItems();

  const handleChange = (e) => {
    setCurrentTodoItem((prevTodoItem) => {
      return { ...prevTodoItem, [e.target.name]: e.target.value };
    });
  };

  const editTodo = () => {
    const newTags = currentTodoItem.tags.filter((tag) => !tags.includes(tag));
    setTags((tags) => tags.concat(newTags));
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
        <Autocomplete
          multiple
          freeSolo
          options={tags}
          //getOptionLabel={(tag) => tag.name}
          defaultValue={currentTodoItem.tags}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Add Tags by pressing Enter"
            />
          )}
          onChange={(e, newValue) => {
            setCurrentTodoItem((prevTodoItem) => {
              return { ...prevTodoItem, tags: newValue };
            });
          }}
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
