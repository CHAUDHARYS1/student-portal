import "./Login.css";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Content } from "antd/es/layout/layout";
const { Title, Paragraph } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 

  return (
    <Content className="content">
      <Title level={2}>Login</Title>
      <Paragraph>
        Sign in and explore your personalized portal! <br />
        Enter your username and password
      </Paragraph>
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
             
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default Login;
