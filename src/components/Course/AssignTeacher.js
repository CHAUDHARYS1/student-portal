// AssignTeacher.js
import React, { useState, useEffect } from "react";
import { Form, Select, Button, message, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const AssignTeacher = ({ courseId, onTeacherAssigned }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    // Fetch the list of teachers from the server and set the teachers state
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async () => {
    console.log("Selected teacher:", selectedTeacher);

    // Send a POST request to the server to assign the selected teacher to the course
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}/assign-teacher`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId: selectedTeacher }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Call the onTeacherAssigned callback with the assigned teacher
      onTeacherAssigned(data);
      message.success("Teacher assigned successfully");

      // reload the page after 500ms to reflect the changes
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error assigning teacher:", error);
      message.error("Failed to assign teacher");
    }
  };

  const handleTeacherChange = (value) => {
    console.log("Selected value:", value); // Log the selected value
    setSelectedTeacher(value);
  };

  return (
    <>
      <div className="mt-2 pb-1 pl-1">
        <Text type="secondary">Assign Teacher to this course:</Text>
      </div>

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="teacher"
          rules={[{ required: true, message: "Please select a teacher" }]}
        >
          <Select onChange={handleTeacherChange}>
            {teachers.map((teacher) => (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.firstName + " " + teacher.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn-primary" htmlType="submit">
            Assign Teacher
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AssignTeacher;
