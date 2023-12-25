// Header.js
import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

const AppHeader = () => {
  return (
    <div id='header'>
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Home
          {/* <Link to="/">Home</Link> */}
        </Menu.Item>
        <Menu.Item key="2">  Login
          {/* <Link to="/">Login</Link> */}
        </Menu.Item>
        <Menu.Item key="3">Register</Menu.Item>
      </Menu>
    </div>
  );
};

export default AppHeader;
