import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useTodoLists } from "../../contexts/TodoListsContext";
import { useTodoItems } from "../../contexts/TodoItemsContext";

/*
Handles rendering the list of todoitems, based on the todolist selected
Maintains addMode state, so that add dialog can be conditionally rendered
*/

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TodoList = (props) => {
  const { currTodoList, tags } = useTodoLists();
  const { todoItems, getTodoItems } = useTodoItems();

  const [addMode, setAddMode] = useState(false);
  const [tagSearch, setTagSearch] = useState([]);
  const classes = useStyles();

  useEffect(() => getTodoItems(), [currTodoList]);

  return (
    <div>
      {todoItems.length > 0 ? (
        <div>
          <Autocomplete
            multiple
            freeSolo
            options={tags}
            //getOptionLabel={(tag) => tag.name}
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
              <TextField {...params} variant="filled" label="Filter by Tags" />
            )}
            onChange={(e, newValue) => {
              setTagSearch(newValue);
            }}
          />
        </div>
      ) : null}
      {todoItems.length > 0 ? (
        <List>
          {/* {console.log(currTodoList)} */}
          {todoItems.map((todoItem) => {
            const tags = todoItem.tags.map((tag) => tag.name);
            if (tagSearch.every((tag) => tags.includes(tag))) {
              return (
                <Todo
                  key={todoItem.id}
                  todoListId={currTodoList.id}
                  {...todoItem}
                />
              );
            }
          })}
        </List>
      ) : null}
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => setAddMode(true)}
      >
        <AddIcon />
      </Fab>
      {addMode ? <AddTodo addMode={addMode} setAddMode={setAddMode} /> : null}
    </div>
  );
};

export default TodoList;
