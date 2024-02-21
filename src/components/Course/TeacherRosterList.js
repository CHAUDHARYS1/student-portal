import React, { useState, useEffect } from "react";
import { List, Typography, Empty, Divider, Button } from "antd";
import RemoveTeacherButton from "./RemoveTeacher";
import { CloseOutlined, EditOutlined, PhoneFilled } from "@ant-design/icons";

const { Text } = Typography;

const TeacherRosterList = ({ course }) => {
  const [teachers, setTeachers] = useState([]);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

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
    <div>
      <List
        className="bg-white"
        header={
          <div>
            <b>Assigned Instructor(s)</b>
            <Button
              onClick={() => setShowRemoveButton(!showRemoveButton)}
              size="small"
              className="bg-transparent"
              style={{ float: "right" }}
            >
              {showRemoveButton ? <CloseOutlined /> : <EditOutlined />}
            </Button>
          </div>
        }
        itemLayout="horizontal"
        bordered
        dataSource={teachers}
        renderItem={(teacherDetails) => (
          <List.Item
            actions={[
              showRemoveButton && (
                <RemoveTeacherButton
                  courseId={course._id}
                  teacherId={teacherDetails._id}
                  onRemove={handleRemoveTeacher}
                  showRemoveButton={showRemoveButton}
                />
              ),
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
    </div>
  );
};

export default TeacherRosterList;
