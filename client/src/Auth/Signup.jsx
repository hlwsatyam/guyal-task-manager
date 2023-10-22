import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const navigate = useNavigate();
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    name: " ",
    email: "",
    password: "",
  });

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post("/register", {
      email: user.email,
      password: user.password,
      name: user.name,
    });
    if (response.status == 202) {
      window.localStorage.setItem("user", response.data.user);
      alert("login success");
      navigate("/");
    }

    // if (name === "" || email === "" || password === "") {
    //   setError(true);
    // } else {
    //   setSubmitted(true);
    //   setError(false);
    //   alert("Registered")
    // }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className=" bg-success text-white"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h6>User {name} successfully registered!!</h6>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error "
        style={{
          display: error ? "" : "none",
        }}
      >
        <h6>Please enter all the fields</h6>
      </div>
    );
  };

  return (
    <div className="app pt-5">
      <div className="">
        <h5 className="title">User Registration</h5>

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          {/* Labels and inputs for form data */}
          <div className="input-container">
            <label className="d-flex">Name</label>
            <input
              value={user.name}
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
              className="inputSec"
              type="uname"
            />
            <br></br>
          </div>
          <div className="input-container">
            <label className="label">Email</label>
            <input
              value={user.email}
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
              className="inputSec"
              type="email"
            />
            <br></br>
          </div>
          <div className="input-container">
            <label className="label">Password</label>
            <input
              value={user.password}
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
              className="inputSec"
              placeholder="password"
              type="password"
            />
          </div>
          <div className="button-container">
            <button onClick={handleSubmit} className="btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
