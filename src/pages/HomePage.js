// HomePage.js
import React from 'react';
import { Typography, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
const {Content} = Layout;
const { Title, Text } = Typography;
const HomePage = () => {
  return (
    <Content className="content">
    <div style={{ }}>
      <Title>Welcome to Our Learning Platform</Title>
      <Text type="secondary">Empowering students, teachers, and parents in the learning journey.</Text>

      <div style={{ marginTop: '20px' }}>
        <Button type="primary" size="large" style={{ marginRight: '10px' }}>
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        </Button>
        <Button size="large">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </div>
    </Content>
  );
};

export default HomePage;
