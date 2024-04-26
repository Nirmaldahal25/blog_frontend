import React, { useContext } from "react";
import "./style.css";
import AuthContext from "../../context/auth/authcontext";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../utils/api";

const LoginPage = (props) => {
  const { setToken, fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const { data } = await apiAxios.post("/auth/token/", {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      setToken(data);
      apiAxios.defaults.headers.common["Authorization"] =
        "Bearer " + data.access;
      localStorage.setItem("token", JSON.stringify(data));
      await fetchUser();
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form method="post" onSubmit={login}>
      <div className="container">
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
