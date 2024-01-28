// Header.js
import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

const AppHeader = () => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
  
    {
      label: <Link to="/intro">Login/Register</Link>,
      key: "intro",
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

 

  return (
    <Sider style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <div className="demo-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[0]}
        mode="inline"
        items={items}
        style={{
          marginTop: "30px",
        }}
      />
    </Sider>
  );
};

export default AppHeader;
