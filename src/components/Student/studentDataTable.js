import React, { useState, useEffect } from "react";
import { Table } from "antd";

const StudentTable = () => {

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
    const tableData = students.map(student => ({
        key: student._id,
        name: `${student.firstName} ${student.lastName}`,
        grade: student.gradeLevel,
        age: student.age,
        gender: student.gender,
        email: student.email,
        phone: student.phone
    }));

    return (
        <Table columns={studentDataTable} dataSource={tableData} />
    )
};


export default StudentTable;