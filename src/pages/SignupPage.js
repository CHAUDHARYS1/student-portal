// Login/Registers.js
import Signup from "../components/Signup/Signup";
import React from "react";
import {Layout, Col, Row } from "antd";
const { Content } = Layout;

const SignupPage = () => {
  return (
    <Content className="content">
      <Row>
        <Col span={16} style={{ background: 'white', height: '100vh' }}>
      

        </Col>
        <Col span={8} className="mt-5 pl-5">
          <Signup />
        </Col>
      </Row>
    </Content>
  );
};

export default SignupPage;
