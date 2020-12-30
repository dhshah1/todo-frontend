import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
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
  const { currTodoList } = useTodoLists();
  const { todoItems, getTodoItems, handleAdd, handleDelete } = useTodoItems();

  const [addMode, setAddMode] = useState(false);
  const classes = useStyles();

  useEffect(() => getTodoItems(), [currTodoList]);

  return (
    <div>
      <List>
        {todoItems.map((todoItem) => {
          return (
            <Todo
              key={todoItem.id}
              todoListId={currTodoList.id}
              {...todoItem}
            />
          );
        })}
      </List>
      <Fab
        color="primary"
        aria-label="add"
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
