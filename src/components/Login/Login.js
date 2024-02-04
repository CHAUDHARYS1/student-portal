import "./Login.css";
import React, { useContext, useState } from "react";
import AuthContext from "../../authContext";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log("Login form values:", values);

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      // Set the isLoggedIn state to true
      setIsLoggedIn(true);
      // Here you would typically save the JWT to local storage
      localStorage.setItem("token", data.token);
      // Redirect the user to the home/dashboarrd page
      navigate("/dashboard");
    } else {
      console.log("Login failed:", response);
      // Here you would display an error message to the user
      alert("Login failed");
    }
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
            label={<span style={{ padding: "0px" }}>Username</span>}
            rules={[{ required: true, message: "Please enter your username!" }]}
            hasFeedback
            validateDebounce={1000}
          >
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white input-active border-radius-0 border-active"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            style={{ marginBottom: "0px" }}
            hasFeedback
            validateDebounce={1000}
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
