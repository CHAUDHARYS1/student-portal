const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  online: {
    type: Boolean,
    default: true, // Assuming online is the default option
  },
  onsite: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],
    default: "beginner",
  },
  assignedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Student model
    },
  ],
  assignedTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Reference to the Teacher model
    },
  ],
  skillsCovered: [{ type: String }],
  schedule: {
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
  },
  resources: {
    textbooks: [{ type: String }],
    externalLinks: [{ type: String }],
  },
  enrollmentStatus: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  language: {
    type: String,
    default: "English",
  },
  courseStatus: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  platformCompatibility: [{ type: String }],
  attendanceTracking: { type: Boolean, default: false },
  flexibleLearningOptions: [{ type: String }],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
