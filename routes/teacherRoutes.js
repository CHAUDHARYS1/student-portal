// Define API routes and their corresponding controllers.
// routes/teacherRoutes.js

const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID

// Delete teacher by ID
router.get('/:id', teacherController.deleteTeacherById);

// POST route for creating a new teacher

// GET teacher by email
router.get('/teachers/:email', teacherController.findTeacherByEmail);


module.exports = router;