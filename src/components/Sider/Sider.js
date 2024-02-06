// Header.js
import "./Sider.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import AuthContext from "../../authContext";

const { Sider  } = Layout;

const SideBar = () => {

  const { isLoggedIn } = useContext(AuthContext);

  const items = [];
  const addtionalItems = [];


  if (isLoggedIn) {
    items.push(
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
    addtionalItems.push({
      label: <Link to="/upcoming">Upcoming Features</Link>,
      key: "upcoming",
    });
  }




  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

 

  return (
    <>
    {isLoggedIn && (

    <Sider id="sider">
      <div className="demo-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
       className="main-menu"
       style={{
        position: "absolute",
        width: "100%",
        
       }}
      />

      <Menu 
        onClick={onClick}
        selectedKeys={[current]}
        items={addtionalItems}
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          marginTop: "30px",
        }}
      />

    </Sider>
    )}
    </>
  );
};

export default SideBar;
