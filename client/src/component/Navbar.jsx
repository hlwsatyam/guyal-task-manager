import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginList = [
  { label: "Guyal", url: "/" },
  { label: "Logout", url: "/logout" },
];
const LogoutList = [
  { label: "Guyal", url: "/" },
  { label: "Login", url: "/login" },
  { label: "Signup", url: "/signup" },
];

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [navigate]);

  return <div className="bg-dark">{isLogged ? <Login /> : <Logout />}</div>;
};

export default Navbar;

const Login = () => {
  return (
    <ul className="d-flex justify-content-around">
      {" "}
      {LoginList.map((item) => (
        <li>
          {" "}
          <Link to={item.url} className="text-decoration-none fw-bold   ">
            {item.label}{" "}
          </Link>{" "}
        </li>
      ))}{" "}
    </ul>
  );
};

const Logout = () => {
  return (
    <ul className="d-flex justify-content-around">
      {" "}
      {LogoutList.map((item) => (
        <li>
          {" "}
          <Link to={item.url} className="text-decoration-none fw-bold   ">
            {item.label}{" "}
          </Link>{" "}
        </li>
      ))}{" "}
    </ul>
  );
};
