// Login/Registers.js
import Signup from "../components/Signup/Signup";
import React from "react";
import { Layout, Col, Row } from "antd";
const { Content } = Layout;

const SignupPage = () => {
  return (
    <Content className="content">
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={16}
          style={{ background: "white", height: "100vh" }}
        >
          {/* Content for larger screens */}
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} className="mt-5 pl-5">
          <Signup />

          <div>
            <p>
              Already have an account?{" "}
              <a href="/login">
                <u>Log in</u>
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default SignupPage;
