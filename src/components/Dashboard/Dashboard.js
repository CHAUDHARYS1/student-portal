// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Table } from 'antd';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};



const Dashboard = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from the server when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };


    fetchStudents();
  }, []);

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch teacher data from the server when the component mounts
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchTeachers();
  }, []);

  // fetch admin data from users table
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admin data from the server when the component mounts
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdmins();
  }, []);


  const studentDataTable = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.grade - b.grade,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gender - b.gender,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    }
  ];

  const studentData = students.map(student => ({
    key: student._id,
    name: `${student.firstName} ${student.lastName}`,
    grade: student.gradeLevel,
    age: student.age,
    gender: student.gender,
    email: student.email,
    phone: student.phone
  }));



  return (
    <div style={{ margin: '0 auto', minWidth: '600px', padding: '20px' }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>This is the dashboard. Here you can see your progress. </Paragraph>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Students" key="1">
          <Table columns={studentDataTable} dataSource={studentData} />
        </TabPane>
        <TabPane tab="Teachers" key="2">


          <ul>
            {teachers.map(teacher => (
              <li key={teacher._id}>{teacher.firstName} {teacher.lastName}, Email: {teacher.email}</li>
            ))}
          </ul>
        </TabPane>
        <TabPane tab="Admins" key="3">
          <ul>
            {admins.map(admin => (
              <li key={admin._id}>{admin.username} {admin.password}</li>
            ))}
          </ul>
        </TabPane>
      </Tabs>
    </div>


  );
}

export default Dashboard;
