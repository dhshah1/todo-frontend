import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TodoList from "./TodoItems/TodoList";
import { useTodoLists } from "../contexts/TodoListsContext";
import { useTodoItems } from "../contexts/TodoItemsContext";
import { useUser } from "../contexts/UserContext";
import SideBar from "./SideBar";

/*
Renders the sidebar, appbar and todo items.
Has logic for hiding the sidebar for smaller screens, from Material UI.
Styling and logic for responsive sidebar largely unchanged from code sample from Material UI.
*/

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: { zIndex: theme.zIndex.drawer + 1 },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logout: {
    marginLeft: theme.spacing(4),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    width: "75%",
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function TodoLayout({ window }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currTodoList, setCurrTodoList, setTodoLists } = useTodoLists();
  const { setTodoItems } = useTodoItems();
  const { logout } = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <SideBar />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logoutAndResetState = () => {
    setTodoItems([]);
    setTodoLists([]);
    setCurrTodoList(null);
    logout();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currTodoList ? currTodoList.name : ""}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={logoutAndResetState}
            className={classes.logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {currTodoList ? <TodoList /> : null}
      </main>
    </div>
  );
}

export default TodoLayout;
