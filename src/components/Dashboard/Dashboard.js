// Dashboard.js
import React from 'react';
import { Tabs, Typography } from 'antd';
import StudentTable from '../Student/studentDataTable';
import TeacherTable from '../Teacher/teacherDataTable';
import AdminTable from '../Admin/adminDataTable';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { students } = StudentTable;
const { teachers } = TeacherTable;
const { admins } = AdminTable;
const Dashboard = () => {

  return (
    <div style={{ margin: '0 auto', minWidth: '600px', padding: '20px' }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>This is the dashboard. Here you can see your progress. </Paragraph>
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
