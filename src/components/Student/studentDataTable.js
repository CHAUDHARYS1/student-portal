import React, { useState, useEffect, useRef } from "react";
import { Table, Modal, Form, Input, Button, FloatButton, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, CustomerServiceOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Item } = Form;
const { confirm } = Modal;


const StudentTable = () => {

  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedStudent, setEditingStudent] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedStudentToDelete] = useState(null);
  const formRef = useRef();

  const handleEdit = (student) => {
    setEditingStudent(student);

    formRef.current?.setFieldsValue(student);
    setIsModalVisible(true);
  };

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


  const handleSave = async () => {
    try {

      console.log('Editing student:', editedStudent);

      if (!editedStudent || !editedStudent.key) {
        console.error('Invalid student data for update');
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

      // Send a request to update the student data
      const response = await fetch(`http://localhost:5000/api/students/${editedStudent.key}`, {
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

        }),
      });

      if (!response.ok) {
        console.error('Failed to update student data');
        // Handle error

      } else {
        const updatedData = await fetch('http://localhost:5000/api/students').then((res) => res.json());
        setStudents(updatedData);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating student data:', error);
      // Handle error
    }
  };

  const handleDelete = (student) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${student.firstName}?`,
      onOk() {
        handleDeleteConfirmed(student);
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };

  const handleDeleteConfirmed = async (student) => {
    try {

      

      if (!student || !student.key) {
        return;
      }

      const response = await fetch(`http://localhost:5000/api/students/${student.key}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete student');
        // Handle error
      } else {
        const updatedData = await fetch('http://localhost:5000/api/students').then((res) => res.json());
        setStudents(updatedData);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle error
    }
  };

  const studentDataTable = [
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Grade',
      dataIndex: 'grade'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Gender',
      dataIndex: 'gender'
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Edit',
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
      ),
    },
    {
      title: 'Delete',
      render: (text, record) => (
        <Button onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
      ),
    }

  ];


  const tableData = students.map(student => ({
    key: student._id,
    firstName: student.firstName,
    lastName: student.lastName,
    grade: student.gradeLevel,
    age: student.age,
    gender: student.gender,
    email: student.email,
    phone: student.phone
  }));




  return (
    <>
      <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }} icon={<CustomerServiceOutlined />}>
        <Tooltip title="Logout"> 
        <FloatButton icon={<LogoutOutlined />} />
        </Tooltip>
      </FloatButton.Group>

        <Table columns={[...studentDataTable]} dataSource={tableData} rowKey={(student) => student.key} />
        <Modal
          title="Edit Student"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}>

          <p>Here is {editedStudent?.firstName}'s</p>

          <Form layout="vertical" onFinish={handleSave} ref={formRef}>

            <Form.Item hasFeedback label="First Name" name="firstName" validateDebounce={1000} initialValue={editedStudent?.firstName}
              rules={[
                { required: true, message: 'Please enter first name' },
                { type: 'string', message: 'Please enter a valid first name' },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item hasFeedback label="Last Name" name="lastName" validateDebounce={1000} initialValue={editedStudent?.lastName}
              rules={[
                { required: true, message: 'Please enter last name' },
                { type: 'string', message: 'Please enter a valid last name' },
              ]}>
              <Input />
            </Form.Item>

            <Item hasFeedback
              label="Email"
              name="email"
              validateDebounce={1000}
              initialValue={editedStudent?.email}
              rules={[
                { required: true, message: 'Please enter the email address' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input />
            </Item>

            <Item hasFeedback
              label="Phone"
              name="phone"
              validateDebounce={1000}
              initialValue={editedStudent?.phone}
              rules={[
                { required: true, message: 'Please enter the phone number' },
                { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' },
              ]}
            >
              <Input />
            </Item>

            {/* Repeat for other attributes */}

            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button key="save" type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        </Modal>

        {/* Delete selected student - modal */}
         <Modal title="Confirm Deletion" open={isDeleteModalVisible} onCancel={() => setIsDeleteModalVisible(false)} onOk={handleDeleteConfirmed(selectedStudentToDelete)}>
          <p>Are you sure you want to delete {selectedStudentToDelete?.firstName} record from the database? This action cannot be undone. </p>
          </Modal>       

      </>
      )
};


      export default StudentTable;