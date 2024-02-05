import React from "react";
import { FloatButton } from "antd";
import LogoutFB from "../Login/Logout";
import UserProfileFB from "../User/userProfileFloatBtn";
import { EllipsisOutlined } from "@ant-design/icons";

const FloatingGroup = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      style={{ right: 24 }}
      icon={<EllipsisOutlined />}
    >
      <LogoutFB />
      <UserProfileFB />
    </FloatButton.Group>
  );
};

export default FloatingGroup;
