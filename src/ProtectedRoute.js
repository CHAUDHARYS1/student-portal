import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (!token) {
      message.error(
        "You do not have access to this page. Redirecting to home page..."
      );
      setRedirectToHome(true);
    }
  }, [token]);

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
