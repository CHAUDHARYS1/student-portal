// add css file
import "./Signup.css";

import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        // ...
      }

      if (response.ok) {
        // Registration successful, navigate to login page
        const data = await response.json();

        message.success("Registration successful. Redirecting to login...");
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Handle error here
        const data = await response.json();
        message.error(data.message || "Registration failed");

      }
    } catch (error) {
      // Handle error here
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "300px" }}>
      <Title level={3}>Registration</Title>

      <Form name="registration" layout="vertical" className="mt-5" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" },  { min: 3, message: 'Username must be at least 3 characters long' }, ]}
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
          rules={[{ required: true, message: "Please input your password!" }, { min: 8, message: 'Password must be at least 8 characters long' },]}
          hasFeedback
          validateDebounce={1000}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white input-active border-radius-0 border-active password-input"
            bordered={false}
          />
        </Form.Item>

        {/* <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
          hasFeedback
          validateDebounce={1000}
        >
          <Input
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-white input-active border-radius-0 border-active"
            bordered={false}
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
          hasFeedback
          validateDebounce={1000}
        >
          <Input
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-white input-active border-radius-0 border-active"
            bordered={false}
          />
        </Form.Item> */}

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
          hasFeedback
          validateDebounce={1000}
        >
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            className="bg-white input-active border-radius-0 border-active"
            bordered={false}
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select your role!" }]}
          hasFeedback
          validateDebounce={1000}
        >
          <Select
            placeholder="Select a role"
            className="bg-white input-active border-radius-0 border-active"
            bordered={false}
            style={{ height: "40px" }}
            onChange={(value) => setRole(value)}
          >
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
            <Option value="admin">Administrator</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="btn-primary btn-shadow border-radius-0"
            style={{ width: "100%" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
