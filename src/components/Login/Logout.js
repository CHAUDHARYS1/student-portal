// Logout.js Component
// LogoutButton.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../authContext";

import { FloatButton, Tooltip } from "antd";
import { LogoutOutlined, EllipsisOutlined } from "@ant-design/icons";


const LogoutButton = () => {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = () => {
        handleLogout();
        setTimeout(() => {
            window.location.href = "/logout-success";
        }, 500);
    };

    return (
        <FloatButton.Group
            trigger="click"
            style={{ right: 24 }}
            icon={<EllipsisOutlined />}
        >
            <Tooltip title="Logout">
                <FloatButton icon={<LogoutOutlined />} onClick={handleClick} />
            </Tooltip>
        </FloatButton.Group>
    );
};

export default LogoutButton;
