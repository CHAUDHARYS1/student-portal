// CoursesList.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Breadcrumb } from 'antd';
import CourseCard from './CourseCard';

const {Content} = Layout;
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
        <Content className="content">
            <Breadcrumb  items={[{ title: 'Courses' },]} />
        <Row>
            {courses.map((course) => (
                <Col key={course._id}>
                    <CourseCard course={course} />
                </Col>

            ))}
        </Row>
        </Content>
    );
};

export default CoursesList;