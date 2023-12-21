// Logic to handle HTTP requests and interact with the database.
const Grade = require('../models/Grade');

// Get all grades
exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get grade by ID
exports.getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Create a new grade with the students first and last name included
exports.createGrade = async (req, res) => {
  try {
    const newGrade = new Grade(req.body);
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a grade by ID
exports.updateGradeById = async (req, res) => {
  try {
    const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(updatedGrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a grade by ID
exports.deleteGradeById = async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add other CRUD operations as needed
