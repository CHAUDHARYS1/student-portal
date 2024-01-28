// Login/Registers.js
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import React from "react";
import { Typography, Button, Layout, Col, Row } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Title, Text } = Typography;
const LoginRegisterPage = () => {
  return (
    <Content className="content">
      <Row>
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
