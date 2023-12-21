// Define API routes and their corresponding controllers.
// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get all students
router.get('/', studentController.getAllStudents);

// Get student by ID
router.get('/:id', studentController.getStudentById);

// Create a new student
router.post('/', studentController.createStudent);

// Delete student by ID
router.delete('/:id', studentController.deleteStudentById);

// Update student by ID
router.put('/:id', studentController.updateStudentById);
// Add other routes as needed

module.exports = router;
