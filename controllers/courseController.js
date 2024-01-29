const Course = require('../models/Course');

// Controller to create a new course
const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get a specific course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId)
      .populate('assignedStudents')
      .populate('assignedTeachers');
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error getting course by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a course by ID
const updateCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error updating course by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a course by ID
const deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
