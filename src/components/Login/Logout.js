// Logout.js Component
// LogoutButton.js
import "./Login.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 

import AuthContext from "../../authContext";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleClick = () => {
    handleLogout();
    navigate("/logout-success"); 
  };

  return (
    <Button icon={<LogoutOutlined />} onClick={handleClick} id="logout-btn">
      Logout
    </Button>
  );
};

export default LogoutButton;
