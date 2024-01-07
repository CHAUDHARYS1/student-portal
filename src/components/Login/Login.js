import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../authContext';
import authService from '../../authService';
const { Title, Paragraph } = Typography;

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      // const response = await authService.login(username, password);
      const user = await authService(credentials);
      login(user);

      // Redirect to the dashboard page after successful login
      navigate('/dashboard');


    } catch (error) {
      console.error('Login failed', error.message);
    }
  };

  return (
    // <div>
    //   <h2>Login</h2>
    //   <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <button onClick={handleLogin}>Login</button>
    // </div>
    <div style={{ maxWidth: '300px', margin: 'auto', marginTop: '100px' }}>
    <Title level={2}>Login</Title>
    <Paragraph>Sign in and explore your personalized portal! Enter your username and password</Paragraph>
    
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLogin}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>


  );
};

export default Login;