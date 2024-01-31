import React, { useState } from "react";
import { Descriptions, Typography, Button } from "antd";
import {
    MobileOutlined,
    LaptopOutlined,
    DesktopOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const CourseDescription = ({ course, setCourse }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedCourse, setEditedCourse] = useState(course);

    const generateCourseItems = () => {
        return [
            {
                label: "Course Name",
                children: editMode ? (
                    <input
                        type="text"
                        value={editedCourse.courseName}
                        onChange={(e) =>
                            setEditedCourse({
                                ...editedCourse,
                                courseName: e.target.value,
                            })
                        }
                    />
                ) : (
                    editedCourse.courseName
                ),
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
                children: editMode ? (
                    <input
                        type="text"
                        value={editedCourse.abbreviation}
                        onChange={(e) =>
                            setEditedCourse({
                                ...editedCourse,
                                abbreviation: e.target.value,
                            })
                        }
                    />
                ) : (
                    course.abbreviation
                ),
            },
            {
                label: "Duration",
                children: course.length + " Weeks",
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
                children: course.platformCompatibility.map((platform, index) => {
                    switch (platform) {
                        case "Mobile" ||
                            "Android" ||
                            "iOS" ||
                            "iPhone" ||
                            "iPad" ||
                            "Tablet" ||
                            "Phone":
                            return <MobileOutlined key={index} />;
                        case "MacOS":
                            return <LaptopOutlined key={index} />;
                        case "Desktop" || "Linux" || "Windows":
                            return <DesktopOutlined  key={index}/>;
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

    const handleEditModeToggle = () => {
        setEditMode(!editMode);
    };

    const handleSaveChanges = async () => {
        console.log(course);
        try {
            if (!course.id) {
                throw new Error("Course ID is undefined");
            }
            

            const response = await fetch(`http://localhost:5000/api/courses/${course.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedCourse),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Update the course state with the response data
            setCourse(data);
            // Exit edit mode
            setEditMode(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <h2>{course.abbreviation}</h2>
            <Text type="secondary">
                Below, you can find additional information about this course.
            </Text>
            <Button onClick={handleEditModeToggle}>
                {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            </Button>
            {editMode && (
                <Button onClick={handleSaveChanges} style={{ marginLeft: "10px" }}>
                    Save Changes
                </Button>
            )}
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
