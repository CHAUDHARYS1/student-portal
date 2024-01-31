import React from 'react';
import { Descriptions } from 'antd';

const CourseScheduleAndResources = ({ course }) => (
    <>
        <Descriptions title="Schedule">
            <Descriptions.Item label="Start" style={{ fontWeight: "bold" }}>{new Date(course.schedule.start).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Descriptions.Item>
            <Descriptions.Item label="End" style={{ fontWeight: "bold" }}>{new Date(course.schedule.end).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="Resources">
            <Descriptions.Item label="Textbooks">{course.resources.textbooks.join(", ")}</Descriptions.Item>
            <Descriptions.Item label="External Links">
                {course.resources.externalLinks.map((link) => (
                    <a href={link} key={link}>
                        {link}
                    </a>
                ))}
            </Descriptions.Item>
        </Descriptions>
    </>
);

export default CourseScheduleAndResources;