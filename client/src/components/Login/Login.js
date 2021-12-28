import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setValue((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/login`, {
        username: value.username,
        password: value.password,
      })
      .then(async (res) => {
        sessionStorage.setItem("token", res.data.token);
        await axios(`http://localhost:5000/user/${res.data.user[0].id}`).then(
          (res) => {
            sessionStorage.setItem("username", res.data[0].username);
            sessionStorage.setItem("hash", res.data[0].hash);
            sessionStorage.setItem("id", res.data[0].user_id);
            navigate("/shoppingcart");
          }
        );
      });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          value={value.username}
          onInput={handleChange}
          placeholder="Enter Username"
        />
        <label>Password</label>
        <input
          onInput={handleChange}
          placeholder="Enter Password"
          name="password"
          value={value.password}
        />
        <button type="submit" value="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
