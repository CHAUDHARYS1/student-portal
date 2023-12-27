// Dashboard.js
import React from 'react';
import { Tabs, Table, Input, Button, Space, Form, Typography } from 'antd';
// import 'antd/dist/antd.css';

const { TabPane } = Tabs;
const { Title } = Typography;

const Dashboard = () => {
  // Dummy data for demonstration purposes
  const studentData = [
    { key: '1', subject: 'Math', grade: 'A', attendance: 'Present' },
    { key: '2', subject: 'English', grade: 'B', attendance: 'Absent' },
    // Add more student data as needed
  ];

  const teacherData = [
    { key: '1', studentName: 'John Doe', grade: '', attendance: '' },
    { key: '2', studentName: 'Jane Doe', grade: '', attendance: '' },
    // Add more teacher data as needed
  ];

  const adminData = [
    { key: '1', teacherName: 'Teacher A', students: ['Student A', 'Student B'] },
    { key: '2', teacherName: 'Teacher B', students: ['Student C', 'Student D'] },
    // Add more admin data as needed
  ];

  const columnsStudent = [
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
    { title: 'Attendance', dataIndex: 'attendance', key: 'attendance' },
  ];

  const columnsTeacher = [
    { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade', render: (_, record) => (
      <Form.Item
        name={`grade-${record.key}`}
        rules={[{ required: true, message: 'Please enter a grade!' }]}
      >
        <Input />
      </Form.Item>
    )},
    { title: 'Attendance', dataIndex: 'attendance', key: 'attendance', render: (_, record) => (
      <Form.Item
        name={`attendance-${record.key}`}
        rules={[{ required: true, message: 'Please enter attendance!' }]}
      >
        <Input />
      </Form.Item>
    )},
  ];

  const columnsAdmin = [
    { title: 'Teacher Name', dataIndex: 'teacherName', key: 'teacherName' },
    { title: 'Assigned Students', dataIndex: 'students', key: 'students', render: students => (
      <ul>
        {students.map(student => (
          <li key={student}>{student}</li>
        ))}
      </ul>
    )},
  ];

  return (
    <div style={{ textAlign: 'center', margin: 'auto', maxWidth: '800px', padding: '20px', marginTop: '100px' }}>
      <Title level={2}>Dashboard</Title>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Student Dashboard" key="1">
          <Table dataSource={studentData} columns={columnsStudent} pagination={false} />
        </TabPane>
        <TabPane tab="Teacher Dashboard" key="2">
          <Table dataSource={teacherData} columns={columnsTeacher} pagination={false} />
          <Space>
            <Button type="primary">Save Grades</Button>
            <Button type="primary">Save Attendance</Button>
          </Space>
        </TabPane>
        <TabPane tab="Admin Dashboard" key="3">
          <Table dataSource={adminData} columns={columnsAdmin} pagination={false} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
