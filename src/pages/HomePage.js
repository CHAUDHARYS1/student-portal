// HomePage.js
import React from 'react';
import { Typography, Layout } from 'antd';
const {Content} = Layout;
const { Title, Text } = Typography;
const HomePage = () => {
  return (
    <Content className="content">
      <div>
        <Title>Welcome to Our Learning Platform</Title>
        <Text type="secondary">Empowering students, teachers, and parents in the learning journey.</Text>
      </div>
      <div>
        <Title level={2}>Latest News</Title>
        <ul>
          <li>News 1</li>
          <li>News 2</li>
          <li>News 3</li>
        </ul>
      </div>
      <div>
        <Title level={2}>Upcoming Events</Title>
        <ul>
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
        </ul>
      </div>
    </Content>
  );
};

export default HomePage;
