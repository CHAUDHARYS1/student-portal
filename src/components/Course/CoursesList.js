// CoursesList.js
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CourseCard from './CourseCard';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses data from API
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        
        fetchCourses();
    }, []);

    return (
        <Row gutter={[16, 16]}>
            {courses.map((course) => (
                <Col key={course._id} span={8}>
                    <CourseCard course={course} />
                </Col>

            ))}
        </Row>
    );
};

export default CoursesList;