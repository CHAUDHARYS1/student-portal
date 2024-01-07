// MongoDB data models
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  // Additional grade details
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
