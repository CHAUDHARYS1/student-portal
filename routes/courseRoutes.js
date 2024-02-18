const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to create a new course
router.post('/', courseController.createCourse);

// Route to get all courses
router.get('/', courseController.getAllCourses);

// Route to get a specific course by ID
router.get('/:id', courseController.getCourseById);

// Route to update a course by ID
router.put('/:id', courseController.updateCourseById);

// Route to delete a course by ID
router.delete('/:id', courseController.deleteCourseById);

// Route to assign a teacher to a course
router.post('/:id/assign-teacher', courseController.assignTeacherToCourse);

module.exports = router;
