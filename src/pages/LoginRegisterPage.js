// Login/Registers.js
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import React from "react";
import {Layout, Col, Row } from "antd";
const { Content } = Layout;
const LoginRegisterPage = () => {
  return (
    <Content className="content">
      <Row className="mt-2">
        <Col span={6}>
          <Login />
        </Col>
        <Col span={18}>
            <Registration />
        </Col>
      </Row>
    </Content>
  );
};

export default LoginRegisterPage;
