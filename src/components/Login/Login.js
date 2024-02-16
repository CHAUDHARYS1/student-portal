import "./Login.css";
import React, { useContext, useState } from "react";
import AuthContext from "../../authContext";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography, Divider, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
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

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      // Set the isLoggedIn state to true
      setIsLoggedIn(true);
      // Here you would typically save the JWT to local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      message.success(data.message || "Login successful. Redirecting...");
      // Redirect the user to the home/dashboarrd page
      navigate("/dashboard");
    } else {
      const data = await response.json();
      console.log("Login failed:", data);
      // Here you would display an error message to the user
      message.error(data.message || "Login failed");
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
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label={<span style={{ padding: "0px" }}>Username</span>}
            rules={[
              { required: true, message: "Please enter your username!" },
              { min: 3, message: 'Username must be minimum 3 characters.' },
              { max: 30, message: 'Username must be maximum 30 characters.' },

            ]}
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
            rules={[{ required: true, message: "Please enter your password!" },
            { min: 8, message: 'Password must be minimum 8 characters.' },
            
          ]}
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
                disabled
              >
                Remember me
              </Checkbox>
            </Form.Item>
            <a
              href="/forgot-password"
              className="text-size-10"
              style={{ fontSize: "12px", marginLeft: "100px" }}
              disabled
            >
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              className="btn-primary btn-shadow border-radius-0"
              htmlType="submit"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <div style={{ textAlign: "center" }}>
          <Title level={5}>Don't have an account?</Title>
          <a href="/signup" className="text-size-10" style={{ fontSize: "12px" }}>
           <u>Sign up</u>
          </a>
        </div>

      </div>
    </>
  );
};

export default Login;
