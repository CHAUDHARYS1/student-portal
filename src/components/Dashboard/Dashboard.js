// Dashboard.js
import React from 'react';
import { Tabs, Typography } from 'antd';
const { Title, Paragraph } = Typography;


const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: 'Students',
    label: 'Tab 1',
    children: 'Content of Tab 1',
  },
  {
    key: 'Teachers',
    label: 'Tab 2',
    children: 'Content of Tab 2',
  },
  {
    key: 'Admins',
    label: 'Tab 3',
    children: 'Content of Tab 3',
  }
];

const Dashboard = () => {
  return (
    <div style={{ maxWidth: '300px', margin: 'auto', marginTop: '100px' }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>This is the dashboard. Here you can see your progress. </Paragraph>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Dashboard;
