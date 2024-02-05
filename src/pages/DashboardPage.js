// Dashboard.js
import React from 'react';
import { Tabs, Typography, Layout } from 'antd';
import StudentTable from '../components/Student/studentDataTable';
import TeacherTable from '../components/Teacher/teacherDataTable';
const {Content } = Layout;

const { Title,} = Typography;
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
    <Content className="content">
      <div>
          <Title level={2}>Dashboard</Title>       
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Content>
  );
}

export default Dashboard;
