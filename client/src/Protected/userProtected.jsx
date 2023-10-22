import React from "react";
import { useEffect } from "react";
import { navigation, useNavigate } from "react-router-dom";
function UserProtected({ child }) {
  const user = window.localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user,navigate]);

  return <div>{user && child}</div>;
}

export default UserProtected;
