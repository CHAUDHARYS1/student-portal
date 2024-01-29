import React from "react";
import { List, Typography, Empty } from "antd";

const { Text } = Typography;

const TeacherRosterList = ({ course }) => {
    console.log("course", course);
    if (!course || !course.assignedTeachers || course.assignedTeachers.length === 0) {
        return <Empty className="mt-2" description={
            <span>
               No teachers assigned to this course.
            </span>
        } />; // return null or some placeholder component when there's no data
    }

    return (
        <List
            className="bg-white"
            header={<div><b>Assigned Instructor(s)</b></div>}
            bordered
            dataSource={course.assignedTeachers}
            renderItem={teacherDetails => (
                <List.Item>
                    {teacherDetails.firstName} {teacherDetails.lastName}
                    <br />
                    <Text type="secondary">{teacherDetails.email}</Text>
                    <br />
                    <Text type="secondary">{teacherDetails.phone}</Text>
                </List.Item>
            )}
        />
    );
};

export default TeacherRosterList;