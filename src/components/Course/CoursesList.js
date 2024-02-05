// CoursesList.js
import React, { useState, useEffect } from "react";
import { Row, Col, Layout, Breadcrumb } from "antd";
import CourseCard from "./CourseCard";

const { Content } = Layout;
const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from API
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/courses",{
          headers: {
            "Authorization": `Bearer ${token}`,
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

  return (
    <Content className="content">
      <div className="mt-2">
        <Breadcrumb items={[{ title: "Courses" }]} />
        <Row>
          {courses.map((course) => (
            <Col key={course._id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default CoursesList;
