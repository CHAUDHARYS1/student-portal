import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Typography } from 'antd';

import authService from '../../authService';
const { Option } = Select;
const { Title, Paragraph } = Typography;


const Registration = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // add a const to get value of role from select
    
    // const [role, setRole] = useState('');

    const handleRegistration = async () => {
        try {
            // You may add additional fields for registration (e.g., email, name)
            const response = await authService.register(username, password);
            console.log('Registration successful. Response:', response);
            // Redirect or perform other actions upon successful registration
        } catch (error) {
            console.log('Registration failed. Error:', error);
            // Handle registration error, show a message, etc.

        }
    };


    return (
        // <div>
        //     <h2>Registration</h2>
        //     <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        //     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <button onClick={handleRegistration}>Register</button>
        // </div>
        <div style={{ maxWidth: '300px', bordered: true }}>
        <Title level={2}>Registration</Title>
        <Paragraph>Register and explore your personalized portal!</Paragraph>

        <Form
        name="registration"
        onFinish={Registration}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
  
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Item>
  
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Form.Item>
  
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
            <Option value="administrator">Administrator</Option>
          </Select>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleRegistration}>
            Register
          </Button>
        </Form.Item>
      </Form>
      </div>
    );

};

export default Registration;