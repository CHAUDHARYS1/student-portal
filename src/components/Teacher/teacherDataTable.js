import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { DateTime } = require("luxon");
const { Option } = Select;
const { confirm } = Modal;

const TeacherTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTeacher, setEditingTeacher] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedTeacherToDelete] = useState(null);
  const [isAddNewTeacherModalVisible, setIsAddNewTeacherModalVisible] =
    useState(false);

  const [teachers, setTeachers] = useState([]);

  const formRef = useRef();

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);

    formRef.current?.setFieldsValue(teacher);
    setIsModalVisible(true);
  };

  useEffect(() => {
    // Fetch teacher data from the server when the component mounts
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTeachers(data);
        // if (data.length > 0 && data[0].subjects) {
        // setTeachers(data[0].subjects);
        // setTeachers(data);
        // }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSave = async () => {
    try {
      console.log("Editing teacher:", editedTeacher);

      if (!editedTeacher || !editedTeacher.key) {
        console.error("Invalid teacher data for update");
        return;
      }

      // Validate form values and make sure it's not empty
      if (!formRef.current?.getFieldsValue()) {
        console.error("Form values are empty");
        return;
      }

      // get form values
      const formValues = formRef.current?.getFieldsValue();
      console.log("Form values:", formValues);
      const token = localStorage.getItem("token");
      // Send a request to update the teacher data
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/teachers/${editedTeacher.key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        }
      );

      if (!response.ok) {
        console.error("Failed to update teacher data" + response.status);
        // Handle error
      } else {
        const updatedTeacher = await response.json();
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
          teacher._id === updatedTeacher._id ? updatedTeacher : teacher
          )
        );
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating teacher data:", error);
      // Handle error
    }
  };

  const handleDelete = (teacher) => {
    confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${teacher.firstName}?`,
      onOk() {
        // Send a request to delete the teacher data
        handleDeleteConfirmed(teacher);
      },
      onCancel() {},
    });
  };

  const handleDeleteConfirmed = async (teacher) => {
    try {
      if (!teacher || !teacher.key) {
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/teachers/${teacher.key}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted student from the students state
      setTeachers((prevTeachers) =>
        prevTeachers.filter((s) => s._id !== teacher.key)
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting teacher data:", error);
      // Handle error
    }
  };

  const teacherDataTable = [
    {
      title: "First Name",
      dataIndex: "firstName",
      filters: teachers.map((teacher) => ({
        text: teacher.firstName,
        value: teacher.firstName,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.firstName.includes(value),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      filters: teachers.map((teacher) => ({
        text: teacher.lastName,
        value: teacher.lastName,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.lastName.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: teachers.map((teacher) => ({
        text: teacher.email,
        value: teacher.email,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => {
        const phoneNumber = record.phone.toString();
        const formattedPhone = `(${phoneNumber.substring(
          0,
          3
        )}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
        return <span>{formattedPhone}</span>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Degree",
      dataIndex: "degree",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Salary (USD) $",
      dataIndex: "salary",
    },
    {
      title: "Employment Type",
      dataIndex: "employmentType",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },

    {
      title: "Edit",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}>
          <EditOutlined />
        </Button>
      ),
      width: "10px",
    },
    {
      title: "Delete",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const tableData = teachers.map((teacher) => ({
    key: teacher._id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    phone: teacher.phone,
    age: teacher.age,
    gender: capitalizeFirstLetter(teacher.gender),
    degree: capitalizeFirstLetter(teacher.degree),
    experience: teacher.experience + " years",
    salary: teacher.salary,
    employmentType: capitalizeFirstLetter(teacher.employmentType),
    subject: teacher.subjects.map((subject, index) => (
      <Tag color="blue" key={index}>{subject}</Tag>
    )),
    createdAt: DateTime.fromISO(teacher.created_at).toLocaleString({
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));
  const handleAddNewTeacher = () => {
    setIsAddNewTeacherModalVisible(true);
  };

  const handleSaveNewTeacher = async () => {
    try {
      // Validate form values and make sure it's not empty
      if (!formRef.current?.getFieldsValue()) {
        console.error("Form values are empty");
        return;
      }

      // Get form values
      const formValues = formRef.current?.getFieldsValue();
      const token = localStorage.getItem("token");
      // Send a request to create a new Teacher
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/teachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // Include the form values for the new Teacher
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone,
          age: formValues.age,
          gender: formValues.gender,
          degree: formValues.degree,
          experience: formValues.experience,
          salary: formValues.salary,
          employmentType: formValues.employmentType,
          subjects: formValues.subjects,
          // Add other attributes as needed
        }),
      });

      if (!response.ok) {
        console.error("Failed to create a new Teacher" + response.status);
        // Handle error
      } else {
        const newTeacherData = await response.json();
        setTeachers([...teachers, newTeacherData]);
        setIsAddNewTeacherModalVisible(false);
        formRef.current?.resetFields(); // Clear the form fields
      }
    } catch (error) {
      console.error("Error creating a new Teacher:", error);
      // Handle error
    }
  };
  const subjectOptions = [
    {
      label: "Mathematics",
      value: "Mathematics",
      options: [
        { label: "Algebra", value: "Algebra" },
        { label: "Calculus", value: "Calculus" },
        { label: "Geometry", value: "Geometry" },
        { label: "Trigonometry", value: "Trigonometry" },
        { label: "Statistics", value: "Statistics" },
        { label: "Probability", value: "Probability" },
        { label: "Differential Equations", value: "Differential Equations" },
        { label: "Linear Algebra", value: "Linear Algebra" },
        { label: "Applied Mathematics", value: "Applied Mathematics" },
        { label: "Applied Physics", value: "Applied Physics" },
        { label: "Applied Chemistry", value: "Applied Chemistry" },
        { label: "Applied Earth Science", value: "Applied Earth Science" },
        { label: "Applied Biology", value: "Applied Biology" },
      ],
    },
    {
      label: "English",
      value: "English",
      options: [
        { label: "English I", value: "English I" },
        { label: "English II", value: "English II" },
        { label: "English III", value: "English III" },
        { label: "English Literature", value: "English Literature" },
        { label: "English Language Arts", value: "English Language Arts" },
        { label: "English Composition", value: "English Composition" },
        { label: "English Grammar", value: "English Grammar" },
        { label: "Creative Writing", value: "Creative Writing" },
        { label: "Literature", value: "Literature" },
        { label: "Writing", value: "Writing" },
        { label: "Grammar", value: "Grammar" },
        { label: "Oral Communication", value: "Oral Communication" },
        { label: "Written Communication", value: "Written Communication" },
        { label: "Public Speaking", value: "Public Speaking" },
        { label: "Speech Communication", value: "Speech Communication" },
      ],
    },
    {
      label: "Science",
      value: "Science",
      options: [
        { label: "Science I", value: "Science I" },
        { label: "Science II", value: "Science II" },
        { label: "Science III", value: "Science III" },
        { label: "Computer Science", value: "Computer Science" },
        { label: "Physical Science", value: "Physical Science" },
        { label: "Chemistry", value: "Chemistry" },
        { label: "Biology", value: "Biology" },
        { label: "Environmental Science", value: "Environmental Science" },
        { label: "Physics", value: "Physics" },
        { label: "Earth Science", value: "Earth Science" },
      ],
    },
    {
      label: "History",
      value: "History",
      options: [
        { label: "History I", value: "History I" },
        { label: "History II", value: "History II" },
        { label: "History III", value: "History III" },
        { label: "Geography", value: "Geography" },
        { label: "Political Science", value: "Political Science" },
        { label: "Sociology", value: "Sociology" },
        { label: "Anthropology", value: "Anthropology" },
        { label: "Social Studies", value: "Social Studies" },
      ],
    },

    {
      label: "Others",
      value: "Others",
      options: [
        { label: "Arts", value: "Arts" },
        { label: "Music", value: "Music" },
        { label: "Physical Education", value: "Physical Education" },
        { label: "Dance", value: "Dance" },
        { label: "Health", value: "Health" },
        { label: "Business", value: "Business" },
        { label: "Economics", value: "Economics" },
        { label: "Finance", value: "Finance" },
      ],
    },
  ];

  return (
    <>
      <Table
        columns={teacherDataTable}
        dataSource={tableData}
        rowKey={(teacher) => teacher.key}
      />

      <Modal
        title="Edit Teacher"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>
          Here is {editedTeacher?.firstName}'s {editedTeacher?.lastName}{" "}
          information. Update any part of the information using the form below.
        </p>

        <Form layout="vertical" onFinish={handleSave} ref={formRef}>
          <Form.Item
            hasFeedback
            label="First Name"
            name="firstName"
            validateDebounce={1000}
            initialValue={editedTeacher?.firstName}
            rules={[
              { required: true, message: "Please enter first name" },
              { type: "string", message: "Please enter a valid first name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Last Name"
            name="lastName"
            validateDebounce={1000}
            initialValue={editedTeacher?.lastName}
            rules={[
              { required: true, message: "Please enter last name" },
              { type: "string", message: "Please enter a valid last name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Email"
            name="email"
            validateDebounce={1000}
            initialValue={editedTeacher?.email}
            rules={[
              { required: true, message: "Please enter the email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Phone"
            name="phone"
            validateDebounce={1000}
            initialValue={editedTeacher?.phone}
            rules={[
              { required: true, message: "Please enter the phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Salary"
            name="salary"
            validateDebounce={1000}
            initialValue={editedTeacher?.salary}
            rules={[{ required: true, message: "Please enter the salary" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Employment Type"
            name="employmentType"
            validateDebounce={1000}
            initialValue={editedTeacher?.employmentType}
            rules={[
              { required: true, message: "Please select an employment type" },
            ]}
          >
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
          <Button key="save" type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDeleteConfirmed(selectedTeacherToDelete)}
      >
        <p>
          Are you sure you want to delete {selectedTeacherToDelete?.firstName}{" "}
          record from the database? This action cannot be undone.{" "}
        </p>
      </Modal>

      {/* Add new teacher button  */}
      <Button
        className="btn-primary"
        icon={<PlusCircleOutlined />}
        onClick={handleAddNewTeacher}
      >
        Add new Teacher
      </Button>
      <Modal
        title="Add New Teacher"
        open={isAddNewTeacherModalVisible}
        onCancel={() => setIsAddNewTeacherModalVisible(false)}
        onOk={handleSaveNewTeacher}
        footer={null}
      >
        <p>Add a new Teacher to the database.</p>

        {/* TODO: \
  - First and last name should be on the same row
  - Add validation to all fields
  - Make sure phone and age field only accepts numbers
  - create a drop down choice for gender. Male or Female
  -  
*/}
        {/* Your form for adding a new Teacher */}
        <Form ref={formRef} onFinish={handleSaveNewTeacher}>
          {/* ... form fields for new Teacher ... */}
          <Form.Item
            hasFeedback
            label="First Name"
            name="firstName"
            validateDebounce={1000}
            rules={[
              { required: true, message: "Please enter first name" },
              { type: "string", message: "Please enter a valid first name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Last Name"
            name="lastName"
            validateDebounce={1000}
            rules={[
              { required: true, message: "Please enter last name" },
              { type: "string", message: "Please enter a valid last name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Email"
            name="email"
            validateDebounce={1000}
            rules={[
              { required: true, message: "Please enter the email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Phone"
            name="phone"
            validateDebounce={1000}
            rules={[
              { required: true, message: "Please enter the phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Age"
            name="age"
            validateDebounce={1000}
            rules={[{ required: true, message: "Please enter age" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select placeholder="Select from option below">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Degree"
            name="degree"
            rules={[
              { required: true, message: "Please select education level" },
            ]}
          >
            <Select placeholder="Select from option below">
              <Option value="Masters">Masters</Option>
              <Option value="Bachelors">Bachelors</Option>
              <Option value="Associates">Associates</Option>
              <Option value="High School Diploma">High School Diploma</Option>
            </Select>
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Experience"
            name="experience"
            rules={[
              { required: true, message: "Please enter experience in years" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Please enter salary" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Employment Type"
            name="employmentType"
            validateDebounce={1000}
            rules={[
              { required: true, message: "Please select an employment type" },
            ]}
          >
            <Select placeholder="Select an option">
              <Option value="Full Time">Full Time</Option>
              <Option value="Part Time">Part Time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Seasonal">Seasonal</Option>
              <Option value="Internship">Internship</Option>
            </Select>
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Subjects"
            name="subjects"
            rules={[{ required: true, message: "Please select subjects" }]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              options={subjectOptions}
            />
          </Form.Item>
          <Button
            key="cancel"
            onClick={() => setIsAddNewTeacherModalVisible(false)}
          >
            Cancel
          </Button>
          <Button key="save" className="btn-primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default TeacherTable;
