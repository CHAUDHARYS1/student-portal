const Teacher = require('../models/Teacher');

// get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// get teacher by id
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// Delete a teacher by id
const deleteTeacherById = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);

    // add validation so the same student with the same name cannot be added
    const existingStudent = await Student.findOne({ firstName: newStudent.firstName, lastName: newStudent.lastName });
    if (existingStudent) {
      return res.status(400).json({ message: 'A student with the same name already exists' });
    }
  
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    
    // add validation so the same teacher with the same name cannot be added
    const existingTeacher = await Teacher.findOne({ firstName: newTeacher.firstName, lastName: newTeacher.lastName });
    if (existingTeacher) {
      return res.status(400).json({ message: 'A teacher with the same name already exists' });
    }
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating teacher' });
  }
}

module.exports = {
  createTeacher
};


module.exports = {
  getAllTeachers,
  deleteTeacherById,
  getTeacherById,
  createTeacher
}