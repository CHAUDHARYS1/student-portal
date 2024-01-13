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
// Find a teacher by email
const findTeacherByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.json(teacher);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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



module.exports = {
  findTeacherByEmail,
  getAllTeachers,
  deleteTeacherById
}