// ForgetPassword.js
import React, { useState } from "react";
import { Button, Input, Form, message, Typography } from "antd";

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming the token is stored in local storage
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      message.success("Password changed successfully.");
    } catch (error) {
      message.error("An error occurred while changing the password.");
    }
  };

  return (
    <>
      <Title level={5}>Change Password</Title>
      <Text type="secondary">
        To change password, please enter your current password and new password.
      </Text>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
        style={{ width: "300px" }}
        className="mt-2"
      >
        <Form.Item
          name="currentPassword"
          rules={[
            { required: true, message: "Please input your current password!" },
          ]}
        >
          <Input.Password
            placeholder="Current Password"
            className="p-1"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input.Password
            placeholder="New Password"
            className="p-1"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your new password!" },
          ]}
        >
          <Input.Password
            placeholder="Confirm new Password"
            className="p-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button className="btn-primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgetPassword;
