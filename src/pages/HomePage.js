// HomePage.js
import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', margin: 'auto', maxWidth: '600px', padding: '20px' }}>
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
  );
};

export default HomePage;
