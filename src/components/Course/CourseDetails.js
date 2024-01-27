// CouseDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin } from 'antd';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {

        if (!id) {
            console.error("Course ID is undefined");
            return;
        }

        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const data = await response.json();
                setCourse(data); 
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (!course) {
        return <Spin />;
    }

    return (
        <div>
        <h2>{course.courseName} </h2>
        <Descriptions  title="Course Details" layout='vertical' bordered>
        <Descriptions.Item label="Description">{course.description}</Descriptions.Item>
        <Descriptions.Item label="Abbreviation">{course.abbreviation}</Descriptions.Item>
</Descriptions>

        {/* Display other course details as needed such as students and teachers */}
        </div>
    );
};

export default CourseDetails;