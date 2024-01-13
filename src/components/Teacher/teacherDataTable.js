import React, { useState, useEffect } from "react";
import { Table } from "antd";

const teacherTable = () => {

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


    const teacherDataTable = [
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name - b.name,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email - b.email,
        },
    ];

  
    const tableData = teachers.map(teacher => ({
        key: teacher._id,
        name: `${teacher.firstName} ${teacher.lastName}`,
        email: teacher.email,
    }));

    return (
        <Table columns={teacherDataTable} dataSource={tableData} />
    )
};


export default teacherTable;