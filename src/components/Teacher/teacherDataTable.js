import React, { useState, useEffect } from "react";
import { Table } from "antd";

const { DateTime } = require("luxon");

const TeacherTable = () => {

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch teacher data from the server when the component mounts
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        const data = await response.json();
        setTeachers(data);
        // if (data.length > 0 && data[0].subjects) {
        // setTeachers(data[0].subjects);
        // setTeachers(data);
        // }
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
      dataIndex: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Gender',
      dataIndex: 'gender'
    },
    {
      title: 'Degree',
      dataIndex: 'degree'
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.experience - b.experience,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Employment Type',
      dataIndex: 'employmentType'
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Date Added to Database',
      dataIndex: 'createdAt',
    }
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const tableData = teachers.map(teacher => ({
    key: teacher._id,
    name: `${teacher.firstName} ${teacher.lastName}`,
    email: teacher.email,
    phone: teacher.phone,
    age: teacher.age,
    gender: capitalizeFirstLetter(teacher.gender),
    degree: capitalizeFirstLetter(teacher.degree),
    experience: teacher.experience + ' years',
    salary: '$' + teacher.salary,
    employmentType: capitalizeFirstLetter(teacher.employmentType),
    subject: teacher.subjects.join(', '),
    createdAt: DateTime.fromISO(teacher.created_at).toLocaleString({ month: 'short', day: 'numeric', year: 'numeric' }),
  }));

  return (
    <Table columns={teacherDataTable} dataSource={tableData} />
  )
};


export default TeacherTable;