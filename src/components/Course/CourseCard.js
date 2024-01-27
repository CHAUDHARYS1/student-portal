// CourseCard.js
import React from "react";
import { Card } from "antd";
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
      extra={`${course.online ? "Online" : "Onsite"}`}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
        <Link to={`/courses/${course._id}`}>
          <ExpandAltOutlined />
        </Link>,
      ]}
      hoverable
    >
      <Meta
        title={course.courseName}
        description={
          <p>
            {`Description: ${course.description}`} <br />{" "}
            {`Level: ${course.level}`} <br />{" "}
            {`Price: ${course.cost}`} <br />
            {`Length: ${course.length} days`}
          </p>
        }
      />
    </Card>
  );
};

export default CourseCard;
