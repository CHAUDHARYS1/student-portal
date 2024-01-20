import React, { useState, useEffect, useRef } from "react";
import { Table, Modal, Form, Input, Button, Select, InputNumber } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { DateTime } = require("luxon");
const { Option } = Select;
const { confirm } = Modal;

const TeacherTable = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTeacher, setEditingTeacher] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedTeacherToDelete] = useState(null);

  const [teachers, setTeachers] = useState([]);


  const formRef = useRef();

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);

    formRef.current?.setFieldsValue(teacher);
    setIsModalVisible(true);
  }


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

  const handleSave = async () => {
    try {
      console.log('Editing teacher:', editedTeacher);

      if (!editedTeacher || !editedTeacher.key) {
        console.error('Invalid teacher data for update');
        return;
      }

      // Validate form values and make sure it's not empty
      if (!formRef.current?.getFieldsValue()) {
        console.error('Form values are empty');
        return;
      }

      // get form values
      const formValues = formRef.current?.getFieldsValue();
      console.log('Form values:', formValues);

      // Send a request to update the teacher data
      const response = await fetch(`http://localhost:5000/api/teachers/${editedTeacher.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Update with the form values
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone,
          salary: formValues.salary,
          employmentType: formValues.employmentType,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update teacher data');
        // Handle error
      } else {
        const updatedData = await fetch('http://localhost:5000/api/teachers').then((res) => res.json());
        setTeachers(updatedData);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating teacher data:', error);
      // Handle error
    }
  };

  const handleDelete = (teacher) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${teacher.firstName}?`,
      onOk() {
        // Send a request to delete the teacher data
        handleDeleteConfirmed(teacher);
      },
      onCancel() { },
    })
  }

  const handleDeleteConfirmed = async (teacher) => {
    try{
      if (!teacher || !teacher.key) {
        return;
      }

      const response = await fetch(`http://localhost:5000/api/teachers/${teacher.key}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete teacher');
        // Handle error
      } else {
        const updatedData = await fetch('http://localhost:5000/api/teachers').then((res) => res.json());
        setTeachers(updatedData);
      }
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  

  const teacherDataTable = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      filters: teachers.map(teacher => ({ text: teacher.firstName, value: teacher.firstName })),
      filterSearch: true,
      onFilter: (value, record) => record.firstName.includes(value),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      filters: teachers.map(teacher => ({ text: teacher.lastName, value: teacher.lastName })),
      filterSearch: true,
      onFilter: (value, record) => record.lastName.includes(value),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: teachers.map(teacher => ({ text: teacher.email, value: teacher.email })),
      filterSearch: true,
      onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text, record) => {
        const phoneNumber = record.phone.toString();
        const formattedPhone = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
        return <span>{formattedPhone}</span>;
      },
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
      title: 'Salary (USD) $',
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
      title: 'Edit',
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
      ),
      width: '10px'
    },
    {
      title: 'Delete',
      render: (text, record) => (
        <Button onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
      ),
    }
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const tableData = teachers.map(teacher => ({
    key: teacher._id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    phone: teacher.phone,
    age: teacher.age,
    gender: capitalizeFirstLetter(teacher.gender),
    degree: capitalizeFirstLetter(teacher.degree),
    experience: teacher.experience + ' years',
    salary: teacher.salary,
    employmentType: capitalizeFirstLetter(teacher.employmentType),
    subject: teacher.subjects.join(', '),
    createdAt: DateTime.fromISO(teacher.created_at).toLocaleString({ month: 'short', day: 'numeric', year: 'numeric' }),
  }));

  return (
    <>
      <Table columns={teacherDataTable} dataSource={tableData} rowKey={(teacher) => teacher.key} />

      <Modal title="Edit Teacher" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>

        <p>Here is {editedTeacher?.firstName}'s {editedTeacher?.lastName} information. Update any part of the information using the form below.</p>

        <Form layout="vertical" onFinish={handleSave} ref={formRef}>
          <Form.Item hasFeedback label="First Name" name="firstName" validateDebounce={1000} initialValue={editedTeacher?.firstName}  rules={[
              { required: true, message: 'Please enter first name' },
              { type: 'string', message: 'Please enter a valid first name' }] }>
            <Input />
          </Form.Item>
          <Form.Item hasFeedback label="Last Name" name="lastName" validateDebounce={1000} initialValue={editedTeacher?.lastName}  rules={[
              { required: true, message: 'Please enter last name' },
              { type: 'string', message: 'Please enter a valid last name' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item hasFeedback label="Email" name="email" validateDebounce={1000} initialValue={editedTeacher?.email}  rules={[
              { required: true, message: 'Please enter the email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item hasFeedback label="Phone" name="phone" validateDebounce={1000} initialValue={editedTeacher?.phone} rules={[
              { required: true, message: 'Please enter the phone number' },
              { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item hasFeedback label="Salary" name="salary" validateDebounce={1000} initialValue={editedTeacher?.salary} rules={[
              { required: true, message: 'Please enter the salary' }, ]}>
          <InputNumber />
          </Form.Item>
          <Form.Item hasFeedback label="Employment Type" name="employmentType" validateDebounce={1000} initialValue={editedTeacher?.employmentType} rules={[
              { required: true, message: 'Please select an employment type' },
            ]}>
            <Select placeholder="Select an option">
              <Option value="Full Time">Full Time</Option>
              <Option value="Part Time">Part Time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Seasonal">Seasonal</Option>
              <Option value="Internship">Internship</Option>
            </Select>  
          </Form.Item>
         

          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>
          <Button key="save" type="primary" htmlType="submit" >
            Save
          </Button>
        </Form>
      </Modal>
      <Modal title="Confirm Deletion" open={isDeleteModalVisible} onCancel={() => setIsDeleteModalVisible(false)} onOk={handleDeleteConfirmed(selectedTeacherToDelete)}>
        <p>Are you sure you want to delete {selectedTeacherToDelete?.firstName} record from the database? This action cannot be undone. </p>
      </Modal>

    </>
  )
};


export default TeacherTable;