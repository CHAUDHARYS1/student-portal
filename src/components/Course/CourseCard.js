// CourseCard.js
import React from "react";
import { Card, Tag, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import {
  ExpandAltOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  // Define a mapping of difficulty levels to tag colors
  const difficultyColors = {
    beginner: "cyan",
    intermediate: "blue",
    advanced: "geekblue",
    expert: "purple",
  };

  // Get the color based on the course level
  const tagColor = difficultyColors[course.level] || "default";

  const handleDelete = async () => {
    try {
      // Simulate an asynchronous API call to delete the course
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Make the actual API call to delete the course
      const response = await fetch(`http://localhost:5000/api/courses/${course._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Show success message
        message.success(`${course.courseName} has been deleted.`);
        // Reload the page
        window.location.reload();
      } else {
        // Show error message
        message.error("Failed to delete the course.");
      }
    } catch (error) {
      // Show error message
      message.error("Failed to delete the course.");
    }
  };

  return (
    <Card
      title={course.abbreviation}
      style={{ width: 300, margin: 16 }}
      extra={[
        <Tag key="online" color="green" bordered={false}>
          {`${course.online ? "Online" : "Onsite"}`}{" "}
        </Tag>,
        <Tag key="length" color="gold" bordered={false}>
          {`${course.length + " Weeks"}`}
        </Tag>
      ]}
      actions={[
        <Popconfirm
          key="delete"
          title={`Are you sure you want to delete ${course.courseName}?`}
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>,
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <Link to={`/courses/${course._id}`}>
          <ExpandAltOutlined />
        </Link>,
      ]}
    >
      <Meta
        title={course.courseName}
        description={
          <p>
            {`${course.description}`} <br />
            <br /> Course Difficulty: <Tag bordered={false} color={tagColor}>{`${course.level.charAt(0).toUpperCase()}${course.level.slice(1)}`}</Tag>
          </p>
        }
      />
    </Card>
  );
};

export default CourseCard;
