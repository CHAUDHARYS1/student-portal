// MongoDB data models
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  grade: { type: String, required: true },
  // Additional student details
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
