import React, { useState, useEffect } from "react";
import { List, Empty, Button } from "antd";
import RemoveStudentButton from "./RemoveStudent";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const StudentRosterList = ({ course }) => {
  const [students, setStudents] = useState(course.assignedStudents);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
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
    <div>
      <List
        className="bg-dark-white"
        header={
          <>
            <div>
              <b>Enrolled Students</b>

              <Button
                onClick={() => setShowRemoveButton(!showRemoveButton)}
                size="small"
                className="bg-transparent "
                style={{ float: "right" }}
              >
                {showRemoveButton ? <CloseOutlined /> : <EditOutlined />}
              </Button>
            </div>
          </>
        }
        bordered
        dataSource={students}
        renderItem={(student) => (
          <List.Item
            actions={[
              showRemoveButton && (
                <RemoveStudentButton
                  courseId={course._id}
                  studentId={student._id}
                  onRemove={handleRemoveStudent}
                  showRemoveButton={showRemoveButton}
                />
              ),
            ]}
          >
            <List.Item.Meta
              title={`${student.firstName} ${student.lastName}`}
              description={student.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default StudentRosterList;
