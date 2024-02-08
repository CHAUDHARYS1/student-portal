// Logout.js Component
// LogoutButton.js
import React, { useContext } from "react";
import AuthContext from "../../authContext";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { handleLogout } = useContext(AuthContext);

  const handleClick = () => {
    handleLogout();
    setTimeout(() => {
      window.location.href = "/logout-success";
    }, 500);
  };

  return (
      <Button icon={<LogoutOutlined />} onClick={handleClick}  style={{
        width: 150,
        height: 50,
        borderRadius: 0,
        float: "right",
      }} >Logout</Button>
  );
};

export default LogoutButton;
