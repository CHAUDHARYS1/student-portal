// Logic to handle HTTP requests and interact with the database.

const Attendance = require('../models/Attendance');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findById(req.params.id);
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(attendanceRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const attendanceRecord = new Attendance(req.body);
    await attendanceRecord.save();
    res.status(201).json(attendanceRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing attendance record by ID
exports.updateAttendanceById = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(attendanceRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an attendance record by ID
exports.deleteAttendanceById = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add other CRUD operations as needed
