// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Tabs, Typography } from 'antd';
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
      } catch(error) {
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
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setTeachers(data); 
      } catch(error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchTeachers();
  }, []);

 
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '100px' }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>This is the dashboard. Here you can see your progress. </Paragraph>
    
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.firstName} {student.lastName}, Grade: {student.grade}</li>
        ))}
      </ul>
      </TabPane>
      <TabPane tab="Tab 2" key="2">
      <ul>
        {teachers.map(teacher => (
          <li key={teacher._id}>{teacher.username}</li>
        ))}
      </ul>
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs> 
    </div>

   
  );
}

export default Dashboard;
