import React, { useState, createContext, useContext } from "react";
import axios from "axios";

/*
Context for User, so that the state can be shared easily among all the components
Keeps state for whether JWT token exists 
Contains methods that handle log in, sign up and log out
*/

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginURL = "http://localhost:3001/auth_token";
  const signUpURL = "http://localhost:3001/users";

  const login = (email, password) => {
    return axios.post(loginURL, { auth: { email, password } }).then((res) => {
      setToken(true);
      localStorage.setItem("token", res.data.jwt);
    });
  };

  const signUp = (email, password) => {
    return axios.post(signUpURL, { user: { email, password } }).then((res) => {
      if (res.status == 201) {
        login(email, password);
      }
    });
  };

  const logout = () => {
    setToken(false);
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        login,
        signUp,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
