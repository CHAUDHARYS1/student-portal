// controllers/userController.js
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();

    // Add validation for new username and password


    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Create a new user with the role "student"
exports.createStudentUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Add validation if needed
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role: 'student' });
    await newUser.save();

    // Create a corresponding student
    const newStudent = new Student({
      userId: newUser._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      grade: req.body.grade,

    });
    await newStudent.save();

    // Generate a JWT token for the newly created user
    const token = jwt.sign({ sub: newUser._id, username: newUser.username, role: newUser.role }, 'tisthesecret', { expiresIn: '1h' });

    res.status(201).json({ user: newUser, student: newStudent, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error: error.message }); // Return a proper error response
  }
};

// Create a new user

// Login user and return JWT token
exports.loginUser = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).json({ message: 'Authentication failed', error: info.message });
      }

      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ sub: user._id, username: user.username, role: user.role }, 'tisthesecret', { expiresIn: '1h' });

      return res.json({ message: 'Authentication successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  })(req, res);
};