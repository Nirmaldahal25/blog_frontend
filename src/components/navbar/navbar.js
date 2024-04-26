import React, { useContext } from "react";
import AuthContext from "../../context/auth/authcontext";
import "./style.css";

const NavBar = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="topnav">
      <a href="/">Blog</a>
      {user ? <a href="/create"> Create </a> : <></>}
      {user ? <a href="/user">{user.username}</a> : <a href="/login">Login</a>}
      {user ? <a href="/logout">Logout</a> : <></>}
    </div>
  );
};

export default NavBar;
