// MongoDB data models
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true },
  // Additional attendance details
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
