import React from "react";
import { FloatButton } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const FloatingGroup = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      style={{ right: 24 }}
      icon={<EllipsisOutlined />}
    >
    </FloatButton.Group>
  );
};

export default FloatingGroup;
