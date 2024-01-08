// MongoDB data models
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, required: true,
        unique: true
    },
    subjects: [String], // List of subjects taught by the teacher
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
    }
    ],
    // Additional teacher details
    created_at: {
        type: Date,
        default: Date.now
    },

});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
