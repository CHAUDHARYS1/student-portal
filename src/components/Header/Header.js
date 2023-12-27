// Header.js
import './Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';



const AppHeader = () => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
    },
    {
      label: <Link to="/login">Login</Link>,
      key: 'login',
    },
    {
      label: <Link to="/register">Register</Link>,
      key: 'register',
    },
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      key: 'register',
    }
  ];

  const [current, setCurrent ] = useState('home');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={['current']} mode="horizontal" items={items} />
  )
}


export default AppHeader;
