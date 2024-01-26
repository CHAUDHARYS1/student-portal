const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to create a new course
router.post('/courses', courseController.createCourse);

// Route to get all courses
router.get('/courses', courseController.getAllCourses);

// Route to get a specific course by ID
router.get('/courses/:id', courseController.getCourseById);

// Route to update a course by ID
router.put('/courses/:id', courseController.updateCourseById);

// Route to delete a course by ID
router.delete('/courses/:id', courseController.deleteCourseById);

module.exports = router;
