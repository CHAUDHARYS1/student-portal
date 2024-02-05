// Login/Registers.js
import Login from "../components/Login/Login";
import React from "react";
import {Layout, Col, Row } from "antd";
const { Content } = Layout;
const LoginPage = () => {
  return (
    <Content className="content">
      <Row>
        <Col xs={18} sm={18} style={{ background: 'white', height: '100vh' }}>
      

        </Col>
        <Col xs={6} sm={6} className="mt-5 pl-5">
          <Login />
        </Col>
      </Row>
    </Content>
  );
};

export default LoginPage;
