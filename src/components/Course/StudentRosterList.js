import React from "react";
import { List, Typography, Empty } from "antd";

const { Text } = Typography;
const StudentRosterList = ({ course }) => {
  if (!course.assignedStudents || course.assignedStudents.length === 0) {
    return <Empty className="mt-2" description={
      <span>
        No students assigned to this course.
      </span>
    } />;
  }

  return (
    <List
      className="bg-dark-white"
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


export default StudentRosterList;