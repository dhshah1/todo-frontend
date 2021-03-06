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
Dialog which handles creation of new TodoItem
*/

const AddTodo = ({ addMode, setAddMode }) => {
  const { tags, setTags } = useTodoLists();
  const { handleAdd } = useTodoItems();
  const [currentTodo, setCurrentTodo] = useState({
    title: "",
    body: "",
    completed: false,
    complete_by: new Date().toISOString().split("T")[0],
    tags: [],
  });

  const handleChange = (e) => {
    setCurrentTodo((prevTodo) => {
      return { ...prevTodo, [e.target.name]: e.target.value };
    });
  };

  const AddTodo = () => {
    if (currentTodo.title !== "") {
      const newTags = currentTodo.tags.filter((tag) => !tags.includes(tag));
      setTags((tags) => tags.concat(newTags));
      setAddMode(false);
      handleAdd(currentTodo);
    }
  };

  return (
    <Dialog open={addMode} onClose={() => setAddMode(false)}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Task Description"
          type="text"
          inputProps={{ maxLength: 30 }}
          fullWidth
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="body"
          label="Task Details"
          type="text"
          fullWidth
          multiline
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="complete_by"
          label="Deadline"
          defaultValue={currentTodo.complete_by}
          type="date"
          onChange={handleChange}
        />
        <Autocomplete
          multiple
          freeSolo
          options={tags}
          //getOptionLabel={(tag) => tag.name}
          defaultValue={currentTodo.tags}
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
            setCurrentTodo((prevTodoItem) => {
              return { ...prevTodoItem, tags: newValue };
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddMode(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={AddTodo} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodo;
