// Dashboard.js
import React from 'react';
import { Tabs, Typography, Col, Row } from 'antd';
import StudentTable from '../Student/studentDataTable';
import TeacherTable from '../Teacher/teacherDataTable';

const { Title, Paragraph, Text } = Typography;
const { students } = StudentTable;
const { teachers } = TeacherTable;

const onChange = (key) => {
  console.log(key);
}


const Dashboard = () => {

  const items = [
    {
      label: 'Students',
      key: '1',
      children: <StudentTable students={students} />,
    },
    {
      label: 'Teachers',
      key: '2',
      children: <TeacherTable teachers={teachers} />,
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row style={{ marginBottom: '20px', border: '2px solid grey', padding: '40px' }}>
        <Col flex={2} style={{ textAlign: 'center' }}>
          <Title level={2}>Dashboard</Title>
        </Col>
        <Col flex={5} style={{ marginTop: '20px', }}>
          <Paragraph>Welcome to the dashboard, where you have access to comprehensive data on students, teachers, and administrators. </Paragraph>
          <Paragraph>Take control as you effortlessly <Text code>view, edit, delete, and add</Text> information for students, teachers, and admins, all in one centralized hub.</Paragraph>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>


  );
}

export default Dashboard;
