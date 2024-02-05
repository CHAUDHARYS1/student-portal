// Logout.js Component
// LogoutButton.js
import React, { useContext } from "react";
import AuthContext from "../../authContext";

import { FloatButton, Tooltip } from "antd";
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
    <Tooltip title="Logout" placement="left">
      <FloatButton icon={<LogoutOutlined />} onClick={handleClick} />
    </Tooltip>
  );
};

export default LogoutButton;
