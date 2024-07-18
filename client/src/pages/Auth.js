import React from "react";
import SignUp from "../components/Auth/Auth";

const Auth = (isUserloggedIn) => {
  return (
    <>
      <SignUp isUserloggedIn={isUserloggedIn} />
    </>
  )
};

export default Auth;
