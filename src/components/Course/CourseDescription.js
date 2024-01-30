import React from 'react';
import { Descriptions, Typography } from 'antd';
import { MobileOutlined, LaptopOutlined, DesktopOutlined } from '@ant-design/icons';

const { Text } = Typography;


const CourseDescription = ({ course }) => {
    const generateCourseItems = () => {
        return [
            {
                label: "Course Name",
                children: course.courseName,
                span: {
                    xs: 2,
                    sm: 3,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                },
            },
            {
                label: "Abbreviation",
                children: course.abbreviation,
            },
            {
                label: "Duration",
                children: course.length + " Days",
            },
            {
                label: "Cost",
                children: "$" + course.cost,
            },
            {
                label: "Online",
                children: course.online ? "Yes" : "No",
            },
            {
                label: "Onsite",
                children: course.onsite ? "Yes" : "No",
            },
            {
                label: "Course Difficulty",
                children: course.level + " Level",
            },
            {
                label: "Skills Covered",
                span: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 2,
                    xxl: 2,
                },
                children: course.skillsCovered.join(", "),
            },
            {
                label: "Course Current Status",
                children: course.courseStatus,
            },
            {
                label: "Platform Compatibility",
                children: course.platformCompatibility.map(platform => {
                    switch (platform) {
                        case "Mobile" || "Android" || "iOS" || "iPhone" || "iPad" || "Tablet" || "Phone":
                            return <MobileOutlined />;
                        case "MacOS":
                            return <LaptopOutlined />;
                        case "Desktop" || "Linux" || "Windows":
                            return <DesktopOutlined />;
                        default:
                            return null;
                    }
                }),
            },
            {
                label: "Flexible Learning Options",
                children: course.flexibleLearningOptions.join(", "),
            },
        ];
    };
    const dynamicCourseItems = generateCourseItems();

    return (
        <>        
        <h2>{course.abbreviation}</h2>
            <Text type="secondary">
                Below, you can find additional information about this course.
            </Text>
            <Descriptions
                size="small"
                bordered
                column={{
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                items={dynamicCourseItems}
                style={{ marginTop: "20px" }}
            />
        </>

    );
};

export default CourseDescription;