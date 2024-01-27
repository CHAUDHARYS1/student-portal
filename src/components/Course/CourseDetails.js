// CouseDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Spin, Typography } from "antd";
import CourseRoaster from "./CourseRoaster";

const {Text } = Typography;
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
        console.log(data);
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
        }
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
    return [
      {
        key: "1",
        label: "Instructor",
        children: course.assignedTeachers[0].firstName + " " + course.assignedTeachers[0].lastName,
      },
      {
        key: "2",
        label: "Email",
        children: course.assignedTeachers[0].email,
      },
      {
        key: "3",
        label: "Phone Number",
        children: course.assignedTeachers[0].phoneNumber,
      },
      {
        key: "4",
        label: "Experience",
        children: course.assignedTeachers[0].experience,
      },
      {
        key: "5",
        label: "Favorite Subjects",
        children: course.assignedTeachers[0].subjects,
      },
    ];
  };
  const dynamicRoaster = roasterList();

  return (
    <>
    <div style={{ padding: "20px" }}>
      <h2>{course.abbreviation}</h2>
      <Text type="secondary">Below, you can find additional information about this course.</Text>
      <Descriptions
        size="large"
        bordered
        column={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        items={dynamicCourseItems}
        style={{ marginTop: "20px" }}
      />

    </div>

  
    <div style={{}}>
      <h2>Roaster</h2>
      <Text type="primary">Course Instructor</Text>
      <Descriptions
        size="large"
        layout="vertical"
        column={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        items={dynamicRoaster}
        style={{
          marginTop: "20px",
          border: "1px solid rgba(5, 5, 5, 0.06)",
          padding: "20px",
        }}
      />
    </div>
    </>
  );
};

export default CourseDetails;
