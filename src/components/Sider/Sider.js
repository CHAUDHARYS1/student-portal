// Header.js
import "./Sider.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import AuthContext from "../../authContext";
import {
  ApartmentOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"; // Import the icons

const { Sider } = Layout;

const SideBar = ({ collapsed }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const items = [];
  const addtionalItems = [];

  if (isLoggedIn) {
    items.push(
      {
        label: <Link to="/courses">Courses</Link>,
        key: "courses",
        icon: <ApartmentOutlined />,
      },
      {
        label: <Link to="/dashboard">Dashboard</Link>,
        key: "dashboard",
        icon: <UnorderedListOutlined />,
      },
      {
        label: <Link to="/calendar">Calendar</Link>,
        key: "calendar",
        icon: <CalendarOutlined />,
      },
      {
        label: <Link to="/upcoming">Upcoming Features</Link>,
        key: "upcoming",
        icon: <ClockCircleOutlined />,
      }
    );
  }

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Sider id="sider" collapsible collapsed={collapsed} trigger={null}>
        <div className="demo-logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          items={items}
          className="main-menu"
        />

        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          items={addtionalItems}
        />
      </Sider>
    </>
  );
};

export default SideBar;
