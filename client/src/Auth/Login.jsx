import React from "react";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    let response = await axios.post("/login", {
      email: user.email,
      password: user.password,
    });
    if (response.status == 202) {
      alert("login success");
      window.localStorage.setItem("user", response.data.user);
      navigate("/");
    } else {
      alert("try again");
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            className="inputSec"
            value={user.email}
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
            type="email"
            name="email"
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            className="inputSec"
            value={user.password}
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
            type="password"
            name="password"
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="app">
        <div className="login-form">
          <div className="title">Log In</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
          <p>
            Don't have a Account?
            <Link to="/signup">
              <span className="text-info">Create Account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
