import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

/*
Handles rendering of SignUp or SignIn page
*/
const AuthenticationPage = (props) => {
  const [signUp, setSignUp] = useState(false);
  if (signUp) {
    return <SignUp setSignUp={setSignUp} />;
  }

  return <SignIn setSignUp={setSignUp} />;
};

export default AuthenticationPage;
