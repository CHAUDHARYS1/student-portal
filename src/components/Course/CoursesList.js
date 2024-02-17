// CoursesList.js
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Layout,
  Breadcrumb,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Typography
} from "antd";
import CourseCard from "./CourseCard";
import { PlusCircleFilled } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    abbreviation: "",
    online: true,
    length: "",
    courseName: "",
    description: "",
    level: "beginner",
    cost: "",
  });
  useEffect(() => {
    // Fetch courses data from API
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleOk = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newCourse = await response.json();
      setCourses([...courses, newCourse]);
    }

    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Content className="content">
      <div className="mt-2">
        <Breadcrumb items={[{ title: "Courses" }]} />
        <Row gutter={[20, 20]} className="mt-2">
          {courses.map((course) => (
            <Col key={course._id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Add a button to add another course  */}
      <div className="mt-2">
        <Button
          className="btn btn-primary"
          onClick={() => setVisible(true)}
          icon={<PlusCircleFilled />}
        >
          Quick Add Course
        </Button>
      </div>

      <Modal
        title="Quick Add Course"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Text type="secondary">Add a course using quick add form below. More info about the course can be added later.</Text>
        <Form
          onFinish={handleOk}
          onFinishFailed={(errorInfo) => {
            console.log("Failed:", errorInfo);
          }}
          layout="vertical"
        >

          <Form.Item
            label="Abbreviation"
            name="abbreviation"
            rules={[
              { required: true, message: "Please add course abbreviation!" },
              { max: 6, message: "Abbreviation cannot exceed 6 characters!" },
            ]}
            className="mt-2"
          >
            <Input
              name="abbreviation"
              value={formData.abbreviation}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Online or Onsite">
            <Radio.Group
              name="online"
              value={formData.online}
              onChange={handleChange}
            >
              <Radio value={true}>Online</Radio>
              <Radio value={false}>Onsite</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Course Length"
            name="courseLength"
            rules={[
              { required: true, message: "Please add course length in weeks!" },
            ]}
          >
            <Input
              name="length"
              value={formData.length}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Course Title"
            name="courseTitle"
            rules={[
              { required: true, message: "Please add course title!" },
              { max: 24, message: "Course title cannot exceed 24 characters!" },
            ]}
          >
            <Input
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Course Description"
            name="courseDescription"
            rules={[
              {
                required: true,
                message: "Please add course description!",
              },
              {
                min: 150,
                message: "Course description must be at least 150 characters!",
              },
            ]}
          >
            <Input.TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Difficulty">
            <Select
              name="level"
              value={formData.level}
              onChange={(value) => setFormData({ ...formData, level: value })}
            >
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="advanced">Advanced</Option>
              <Option value="expert">Expert</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[{ required: true, message: "Please input the cost!" }]}
          >
            <InputNumber
              name="cost"
              value={formData.cost}
              onChange={(value) => setFormData({ ...formData, cost: value })}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              min={0}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default CoursesList;
