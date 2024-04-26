import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authcontext";
import { useNavigate } from "react-router-dom";

const LogOutPage = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      logOut();
      navigate("/");
    }, 3000);
  });

  return <h1>You have been logged out. Redireting to home.</h1>;
};

export default LogOutPage;
