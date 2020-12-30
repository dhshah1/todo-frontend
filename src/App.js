import React from "react";
import TodoLayout from "./components/TodoLayout";
import AuthenticationPage from "./components/AuthenticationPage";
import { useUser } from "./contexts/UserContext";

const App = () => {
  const { token } = useUser();
  return token ? <TodoLayout /> : <AuthenticationPage />;
};

export default App;
