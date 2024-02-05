
import React from "react";
import { useNavigate } from "react-router-dom";

import { FloatButton, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfileButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      window.location.href = "/userprofile";
    }, 500);
  };

  return (
    <Tooltip title="User Profile" placement="left">
      <FloatButton icon={<UserOutlined />} onClick={handleClick} />
    </Tooltip>
  );
};

export default UserProfileButton;
