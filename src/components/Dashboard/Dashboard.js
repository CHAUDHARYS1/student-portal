// Dashboard.js
import React from 'react';
import { Tabs, Typography } from 'antd';
import StudentTable from '../Student/studentDataTable';
import TeacherTable from '../Teacher/teacherDataTable';
import AdminTable from '../Admin/adminDataTable';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { students } = StudentTable;
const { teachers } = TeacherTable;
const { admins } = AdminTable;
const Dashboard = () => {

  return (
    <div style={{ margin: '0 auto', minWidth: '1000px', padding: '20px' }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>Welcome to the dashboard, where you have access to comprehensive data on students, teachers, and administrators. </Paragraph>
      <Paragraph>Take control as you effortlessly <Text code>view, edit, delete, and add</Text> information for students, teachers, and admins, all in one centralized hub.</Paragraph>
   
      <Tabs defaultActiveKey="1"> 
        <TabPane tab="Students" key="1">
          <StudentTable students={students} />
        </TabPane>
        <TabPane tab="Teachers" key="2">
          <TeacherTable teachers={teachers} />
        </TabPane>
        <TabPane tab="Admins" key="3">
          <AdminTable admins={admins} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Dashboard;
