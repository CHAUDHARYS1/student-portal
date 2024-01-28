// Header.js
import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const AppHeader = () => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
    },
    {
      label: <Link to="/register">Register</Link>,
      key: "register",
    },
    {
      label: <Link to="/courses">Courses</Link>,
      key: "courses",
    },
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      key: "dashboard",
    },
  ];

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />

      <Menu
        theme="dark"
        onClick={onClick}
        selectedKeys={["current"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default AppHeader;
