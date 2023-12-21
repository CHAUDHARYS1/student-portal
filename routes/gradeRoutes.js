// Define API routes and their corresponding controllers.
// routes/gradeRoutes.js

const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// Get all grades
router.get('/', gradeController.getAllGrades);

// Get grade by ID
router.get('/:id', gradeController.getGradeById);

// Create a new grade
router.post('/', gradeController.createGrade);

// Update grade by ID
router.put('/:id', gradeController.updateGradeById);

// Delete grade by ID
router.delete('/:id', gradeController.deleteGradeById);

module.exports = router;
