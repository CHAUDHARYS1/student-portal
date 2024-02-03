import "./Login.css";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const { Title, Paragraph } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (values) => {
    console.log("Login form values:", values);
    // Add your login logic here
  };

  return (
    <>
      <Title level={3}>Login</Title>

      <div className="login-container mt-5">
        <Form
          name="loginForm"
          onFinish={handleLogin}
          layout="vertical"
          id="loginForm"
        >
          <Form.Item
            name="username"
            label={<span style={{ padding: "0px" }}>Email address</span>}
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white input-active border-radius-0"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            style={{ marginBottom: "0px" }}
          >
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className="bg-white input-active border-radius-0"
              bordered={false}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="border-radius-0 tsize-12"
                style={{ fontSize: "12px" }}
              >
                Remember me
              </Checkbox>
            </Form.Item>
            <a
              href="/forgot-password"
              className="text-size-10"
              style={{ fontSize: "12px", marginLeft: "100px" }}
            >
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              className="btn-primary btn-shadow border-radius-0"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
