// Header.js
import "./Sider.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import AuthContext from "../../authContext";

const { Sider  } = Layout;

const SideBar = () => {

  const { isLoggedIn } = useContext(AuthContext);

  const items = [
  
    
  ];

  if (isLoggedIn) {
    items.push({
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      label: <Link to="/courses">Courses</Link>,
      key: "courses",
    },
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      key: "dashboard",
    },
    {
      label: <Link to="/calendar">Calendar</Link>,
      key: "calendar",
    },
    
    );
  }

  if (!isLoggedIn) {
    items.push(
      {
        label:<Link to="/login">Login</Link>,
        key: "login",
      },
      {
        label: <Link to="/signup">Signup</Link>,
        key: "signup",
      }
    );
  }


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
        selectedKeys={[current]}
        mode="inline"
        items={items}
        style={{
          marginTop: "30px",
        }}
      />
    </Sider>
  );
};

export default SideBar;
