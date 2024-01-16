// Define API routes and their corresponding controllers.
// routes/attendanceRoutes.js

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Get all attendance records
router.get('/', attendanceController.getAllAttendance);

// Get attendance record by ID
router.get('/:id', attendanceController.getAttendanceById);

// Create a new attendance record
router.post('/', attendanceController.createAttendance);

// Update attendance record by ID
router.put('/:id', attendanceController.updateAttendanceById);

// Delete attendance record by ID
router.delete('/:id', attendanceController.deleteAttendanceById);

// Add other routes as needed

module.exports = router;
