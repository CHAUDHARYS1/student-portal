// Dashboard.js
import React from 'react';
import { Tabs, Typography, Layout } from 'antd';
import StudentTable from '../components/Student/studentDataTable';
import TeacherTable from '../components/Teacher/teacherDataTable';
const {Content } = Layout;

const { Title, Text} = Typography;
const { students } = StudentTable;
const { teachers } = TeacherTable;

const onChange = (key) => {
  console.log(key);
}


const Roster = () => {

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
          <Title level={4}>Roaster</Title>
          <Text type='secondary'>List of Student(s) and Instructor(s) - Max 10 per page</Text>       
        
          <Text type='secondary' style={{float: 'right'}}>Filter by first and last name, age or email</Text>

      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <div>
      </div>
    </Content>
  );
}

export default Roster;
