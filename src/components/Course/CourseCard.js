// CourseCard.js
import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  ExpandAltOutlined,
  SettingOutlined,
  EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  return (
    <Card
      title={course.abbreviation}
      style={{ width: 300, margin: 16 }}
      extra={
        <Tag color="blue">
          {`${course.online ? "Online" : "Onsite"}`}{" "}
          {`${course.length + " days"}`}
        </Tag>
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
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
            <br /> Course Difficulty: <Tag>{`${course.level}`}</Tag>
          </p>
        }
      />
    </Card>
  );
};

export default CourseCard;
