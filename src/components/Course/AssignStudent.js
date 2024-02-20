// AssignStudent.js
import React, { useState, useEffect } from "react";
import { Form, Select, Button, message, Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;

const AssignStudent = ({ courseId, onStudentAssigned }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Fetch the list of students from the server and set the students state
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    console.log("Selected student:", selectedStudent);

    // Send a POST request to the server to assign the selected student to the course
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}/assign-student`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId: selectedStudent }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Call the onStudentAssigned callback with the assigned student
      onStudentAssigned(data);
      message.success("Student assigned successfully");

      // reload the page after 500ms to reflect the changes
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error assigning student:", error);
      message.error("Failed to assign student");
    }
  };

  const handleStudentChange = (value) => {
    console.log("Selected value:", value); // Log the selected value
    setSelectedStudent(value);
  };

  return (
    <>
      <div className="mt-2 pb-1">
        <Text type="secondary">Assign Student to this course:</Text>
      </div>

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="student"
          rules={[{ required: true, message: "Please select a student" }]}
        >
          <Select onChange={handleStudentChange}>
            {students.map((student) => (
              <Option key={student._id} value={student._id}>
                {student.firstName + " " + student.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ marginTop: "-10px"}}>
          <Button className="btn-primary" htmlType="submit">
            Assign Student
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AssignStudent;
