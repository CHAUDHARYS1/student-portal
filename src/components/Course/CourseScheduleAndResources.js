import React from "react";
import { Descriptions } from "antd";

const CourseScheduleAndResources = ({ course }) => {
    if (!course) {
        return <div>Loading</div>;
    }

    const start = course.schedule && course.schedule.start ? new Date(course.schedule.start).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }) : 'N/A';

    const end = course.schedule && course.schedule.end ? new Date(course.schedule.end).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }) : 'N/A';

    const textbooks = course.resources && course.resources.textbooks ? course.resources.textbooks.join(", ") : 'N/A';

    const externalLinks = course.resources && course.resources.externalLinks ? course.resources.externalLinks.map((link) => (
        <a href={link} key={link}>
            {link}
        </a>
    )) : 'N/A';

    return (
        <>
            <Descriptions title="Schedule" bordered>
                <Descriptions.Item label="Start" style={{ fontWeight: "bold" }}>
                    {start}
                </Descriptions.Item>
                <Descriptions.Item label="End" style={{ fontWeight: "bold" }}>
                    {end}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title="Resources" bordered className="mt-2">
                <Descriptions.Item label="Textbooks">
                    {textbooks}
                </Descriptions.Item>
                <Descriptions.Item label="External Links">
                    {externalLinks}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default CourseScheduleAndResources;