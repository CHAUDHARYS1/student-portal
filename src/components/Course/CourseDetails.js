// CouseDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherRosterList from "./TeacherRosterList";
import StudentRosterList from "./StudentRosterList";
import CourseDescription from "./CourseDescription";
import { Row, Col, Spin, Typography, Layout, Breadcrumb } from "antd";

const { Content } = Layout;
const { Text } = Typography;

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Course ID is undefined");
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);


  if (!course) {
    return <Spin />;
  }


  return (
    <Content className="content mt-2">
      <Breadcrumb
        items={[
          { title: <a href="/courses">Courses</a> },
          { title: course.courseName },
        ]}
      />
      <div style={{ padding: "20px" }}>
        <CourseDescription course={course} />
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Roster</h2>
        <Text type="secondary">
          Below you will find a list of students who are currently enrolled and
          teachers assigned to this course.
        </Text>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: "20px" }}
        >
          <Col span={8}>
            <TeacherRosterList course={course} />
          </Col>
          <Col span={16}>
            <StudentRosterList course={course} />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default CourseDetails;
