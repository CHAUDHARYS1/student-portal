import React, { useState, useEffect, useRef } from "react";
import { Table, Modal, Form, Input, Button, Select, InputNumber } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";


const { Option } = Select;
const { Item } = Form;
const { confirm } = Modal;


const StudentTable = () => {

  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedStudent, setEditingStudent] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedStudentToDelete] = useState(null);
  const [isAddNewStudentModalVisible, setIsAddNewStudentModalVisible] = useState(false);

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
      dataIndex: 'firstName',
      filters: students.map(student => ({ text: student.firstName, value: student.firstName })),
      filterSearch: true,
      onFilter: (value, record) => record.firstName.includes(value),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      filters: students.map(student => ({ text: student.lastName, value: student.lastName })),
      filterSearch: true,
      onFilter: (value, record) => record.lastName.includes(value),
    },

    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Gender',
      dataIndex: 'gender'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: students.map(student => ({ text: student.email, value: student.email })),
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

  const tableData = students.map(student => ({
    key: student._id,
    firstName: student.firstName,
    lastName: student.lastName,
    age: student.age,
    gender: student.gender,
    email: student.email,
    phone: student.phone
  }));



  const handleAddNewStudent = () => {
    setIsAddNewStudentModalVisible(true);
  };

  const handleSaveNewStudent = async () => {
    try {

      // Validate form values and make sure it's not empty
      if (!formRef.current?.getFieldsValue()) {
        console.error('Form values are empty');
        return;
      }

      // Get form values
      const formValues = formRef.current?.getFieldsValue();

      // Send a request to create a new student
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include the form values for the new student
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          age: formValues.age,
          gender: formValues.gender,
          email: formValues.email,
          gradeLevel: formValues.gradeLevel,
          phone: formValues.phone,
          // Add other attributes as needed
        }),
      });

      if (!response.ok) {
        console.error('Failed to create a new student');
        // Handle error
      } else {
        const newStudentData = await response.json();
        setStudents([...students, newStudentData]);
        setIsAddNewStudentModalVisible(false);
        formRef.current?.resetFields(); // Clear the form fields
      }
    } catch (error) {
      console.error('Error creating a new student:', error);
      // Handle error
    }
  };


  return (
    <>


      <Table columns={[...studentDataTable]} dataSource={tableData} rowKey={(student) => student.key} />


      <Modal
        title="Edit Student"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}>

        <p>Here is {editedStudent?.firstName}'s {editedStudent?.lastName} information. Update any part of the information using the form below.</p>

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
          <Button key="save" type="primary" htmlType="submit" >
            Save
          </Button>
        </Form>
      </Modal>

      {/* Delete selected student - modal */}
      <Modal title="Confirm Deletion" open={isDeleteModalVisible} onCancel={() => setIsDeleteModalVisible(false)} onOk={handleDeleteConfirmed(selectedStudentToDelete)}>
        <p>Are you sure you want to delete {selectedStudentToDelete?.firstName} record from the database? This action cannot be undone. </p>
      </Modal>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={handleAddNewStudent}
      >
        Add new Student
      </Button>

      <Modal title="Add New Student" open={isAddNewStudentModalVisible} onCancel={() => setIsAddNewStudentModalVisible(false)} onOk={handleSaveNewStudent} footer={null}>

        <p>Add a new student to the database.</p>

        {/* TODO: \
          - First and last name should be on the same row
          - Add validation to all fields
          - Make sure phone and age field only accepts numbers
          - create a drop down choice for gender. Male or Female
          -  
        */}
        {/* Your form for adding a new student */}
        <Form ref={formRef} onFinish={handleSaveNewStudent}>
          {/* ... form fields for new student ... */}
          <Form.Item hasFeedback label="First Name" name="firstName" validateDebounce={1000}
            rules={[
              { required: true, message: 'Please enter first name' },
              { type: 'string', message: 'Please enter a valid first name' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item hasFeedback label="Last Name" name="lastName" validateDebounce={1000}
            rules={[
              { required: true, message: 'Please enter last name' },
              { type: 'string', message: 'Please enter a valid last name' },
            ]}>
            <Input />
          </Form.Item>
          <Item hasFeedback label="Email" name="email" validateDebounce={1000} rules={[{ required: true, message: 'Please enter the email address' }, { type: 'email', message: 'Please enter a valid email address' },]}>
            <Input />
          </Item>
          <Form.Item hasFeedback label="Age" name="age" validateDebounce={1000} rules={[{ required: true, message: 'Please enter age' }]}>
            <InputNumber />
          </Form.Item>

          <Item hasFeedback label="Phone" name="phone" validateDebounce={1000} rules={[{ required: true, message: 'Please enter the phone number' }, { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' },]}>
            <Input />
          </Item>

          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' },]}>
            <Select placeholder="Select from option below" >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item hasFeedback label="Grade Level" name="gradeLevel" validateDebounce={1000} rules={[{ required: true, message: "Please enter student's grade" }]}>
            <InputNumber />
          </Form.Item>


          <Button key="cancel" onClick={() => setIsAddNewStudentModalVisible(false)}>Cancel</Button>
          <Button key="save" type="primary" htmlType="submit">Save</Button>

        </Form>
      </Modal>
    </>
  )
};


export default StudentTable;