// Define API routes and their corresponding controllers.
// routes/teacherRoutes.js

const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Delete teacher by ID
router.delete('/:id', teacherController.deleteTeacherById);

// POST route for creating a new teacher
router.post('/', teacherController.createTeacher);

// PUT route for updating a teacher by ID
router.put('/:id', teacherController.updateTeacherById);


module.exports = router;