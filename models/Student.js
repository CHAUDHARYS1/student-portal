// MongoDB data models
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: false
  },
  gradeLevel: {
    type: String,
    required: true
  },
  assignedCourses:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  assignedTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  // Additional student details
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
