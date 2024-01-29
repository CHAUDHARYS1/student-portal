// CouseDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Descriptions,
  Spin,
  Typography,
  Layout,
  Breadcrumb, List
} from "antd";
import CourseRoaster from "./CourseRoaster";
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

  const generateCourseItems = () => {
    return [
      {
        label: "Course Name",
        children: course.courseName,
        span: {
          xs: 2,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        },
      },
      {
        label: "Abbreviation",
        children: course.abbreviation,
      },
      {
        label: "Duration",
        children: course.length + " Days",
      },
      {
        label: "Cost",
        children: "$" + course.cost,
      },
      {
        label: "Online",
        children: course.online ? "Yes" : "No",
      },
      {
        label: "Onsite",
        children: course.onsite ? "Yes" : "No",
      },
      {
        label: "Course Difficulty",
        children: course.level + " Level",
      },
      {
        label: "Skills Covered",
        span: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 2,
          xxl: 2,
        },
        children: course.skillsCovered.join(", "),
      },
      {
        label: "Course Current Status",
        children: course.courseStatus,
      },
      {
        label: "Platform Compatibility",
        children: course.platformCompatibility.join(", "),
      },
      {
        label: "Flexible Learning Options",
        children: course.flexibleLearningOptions.join(", "),
      },
    ];
  };
  const dynamicCourseItems = generateCourseItems();


  const roasterList = () => {
    if (!course.assignedTeachers || course.assignedTeachers.length === 0) {
      return [];
    }

    const teacherDetails = course.assignedTeachers[0]; // assuming each course has only one assigned teacher

    return [
      {
        label: "Instructor",
        children: teacherDetails.firstName + " " + teacherDetails.lastName,
      },
      {
        label: "Email",
        children: teacherDetails.email,
      },
      {
        label: "Phone",
        children: teacherDetails.phone,
      },
      {
        label: "Degree",
        children: teacherDetails.degree,
      },
    ];
  };

  const dynamicRoaster = roasterList();
  
  const StudentList = () => {
    if (!course.assignedStudents) {
      return null;
    }
  
    return (
      <List
        header={<div><b>Enrolled Students</b></div>}
        bordered
        dataSource={course.assignedStudents}
        renderItem={student => (
          <List.Item>
            {student.firstName} {student.lastName}
            <br />
            <Text type="secondary">{student.email}</Text>
          </List.Item>
        )}
      />
    );
  };



  return (
    <Content className="content mt-2">
      <Breadcrumb
        items={[
          { title: <a href="/courses">Courses</a> },
          { title: course.courseName },
        ]}
      />
      <div style={{ padding: "20px" }}>
        <h2>{course.abbreviation}</h2>
        <Text type="secondary">
          Below, you can find additional information about this course.
        </Text>
        <Descriptions
          size="small"
          bordered
          column={{
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          items={dynamicCourseItems}
          style={{ marginTop: "20px" }}
        />
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Roaster</h2>
        <Text type="secondary">
          Below you will find a list of students who are currently enrolled and
          teachers assigned to this course.
        </Text>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: "20px" }}
        >
          <Col span={18} push={6}>
            <div>
              <Descriptions
                size="large"
                layout="vertical"
                column={{
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                items={dynamicRoaster}
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(5, 5, 5, 0.06)",
                  padding: "20px",
                }}
              />
            </div>
          </Col>
          <Col span={6} pull={18}>
            <StudentList />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default CourseDetails;
