import React, { useState, useEffect } from "react";
import { List, Typography, Empty, Divider } from "antd";
import RemoveTeacherButton from "./RemoveTeacher";
import { PhoneFilled } from "@ant-design/icons";

const { Text } = Typography;

const TeacherRosterList = ({ course }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    setTeachers(course.assignedTeachers);
  }, [course]);

  const handleRemoveTeacher = (removeTeacherId) => {
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher._id !== removeTeacherId)
    );
  };

  if (!teachers || teachers.length === 0) {
    return (
      <Empty
        className="mt-2"
        description={<span>No teachers assigned to this course.</span>}
      />
    );
  }

  return (
    <List
      className="bg-white"
      header={
        <div>
          <b>Assigned Instructor(s)</b>
        </div>
      }
      itemLayout="horizontal"
      bordered
      dataSource={teachers}
      renderItem={(teacherDetails) => (
        <List.Item
          actions={[
            <RemoveTeacherButton
              courseId={course._id}
              teacherId={teacherDetails._id}
              onRemove={handleRemoveTeacher}
            />,
          ]}
        >
          <List.Item.Meta
            title={teacherDetails.firstName + " " + teacherDetails.lastName}
            description={teacherDetails.email}
          />

            <PhoneFilled />
            <Divider type="vertical" />
          <Text type="secondary">
            {String(teacherDetails.phone).replace(
              /(\d{3})(\d{3})(\d{4})/,
              "($1) $2-$3"
            )}
          </Text>
          <br />
        </List.Item>
      )}
    />
  );
};

export default TeacherRosterList;
