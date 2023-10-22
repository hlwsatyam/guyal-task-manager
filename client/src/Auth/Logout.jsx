import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  window.localStorage.removeItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);
}

export default Logout;
