// ForgetPassword.js
import React, { useState } from "react";
import { Button, Input, Form, message, Typography } from "antd";

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {

      const userId = localStorage.getItem("userId"); // get userId from local storage

      // Verify the current password
      const verifyResponse = await fetch(
        "http://localhost:5000/api/users/verify-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming the token is stored in local storage
          },
          body: JSON.stringify({ userId, password: currentPassword }),
        }
      );

      if (!verifyResponse.ok) {
        throw new Error(`HTTP error! status: ${verifyResponse.status}`);
      }

      const verifyData = await verifyResponse.json();

      if (verifyData.message !== 'Password verified') {
        message.error('Current password is incorrect');
        return;
      }

      // Change the password
      const changeResponse = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming the token is stored in local storage
          },
          body: JSON.stringify({ userId,currentPassword, newPassword }),
        }
      );

      if (!changeResponse.ok) {
        throw new Error(`HTTP error! status: ${changeResponse.status}`);
      }

      message.success("Password changed successfully. Redirecting to login page.");

      // remove token and userId from local storage and redirect to login page after 5 seconds 
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

    } catch (error) {
      message.error("An error occurred while changing the password.");
    } finally {
      setLoading(false);
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
            { min: 8, message: "Password must be at least 8 characters long!" },
            { pattern: /[A-Z]/, message: "Password must contain at least one uppercase letter!" },
            { pattern: /[a-z]/, message: "Password must contain at least one lowercase letter!" },
            { pattern: /[0-9]/, message: "Password must contain at least one number!" },
            { pattern: /[^A-Za-z0-9]/, message: "Password must contain at least one special character!" },
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
          <Button className="btn-primary" htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgetPassword;
