// Login/Registers.js
import Signup from "../components/Signup/Signup";
import React from "react";
import {Layout, Col, Row } from "antd";
const { Content } = Layout;

const SignupPage = () => {
  return (
    <Content className="content">
      <Row>
        <Col xs={24} sm={8} style={{ background: 'white', height: '100vh' }}>
          {/* Content for larger screens */}
        </Col>
        <Col xs={24} sm={16} className="mt-5 pl-5">
          <Signup />
        </Col>
      </Row>
    </Content>
  );
};

export default SignupPage;
