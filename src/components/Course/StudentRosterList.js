import React, { useState, useEffect } from "react";
import { List, Empty } from "antd";
import RemoveStudentButton from "./RemoveStudent";

const StudentRosterList = ({ course }) => {
  const [students, setStudents] = useState(course.assignedStudents);
  useEffect(() => {
    setStudents(course.assignedStudents);
  }, [course]);

  const handleRemoveStudent = (removedStudentId) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== removedStudentId)
    );
  };

  if (!students || students.length === 0) {
    return (
      <Empty
        className="mt-2"
        description={<span>No students assigned to this course.</span>}
      />
    );
  }

  return (
    <List
      className="bg-dark-white"
      header={
        <div>
          <b>Enrolled Students</b>
        </div>
      }
      bordered
      dataSource={students}
      renderItem={(student) => (
        <List.Item
          actions={[
            <RemoveStudentButton
              courseId={course._id}
              studentId={student._id}
              onRemove={handleRemoveStudent}
            />,
          ]}
        >
          <List.Item.Meta
            title={`${student.firstName} ${student.lastName}`}
            description={student.email}
          />
        </List.Item>
      )}
    />
  );
};

export default StudentRosterList;
