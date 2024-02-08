// controllers/userController.js
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Student = require("../models/Student");
const Joi = require("joi");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // Update all fields in the user document
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Login user and return JWT token
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log(`Received username: ${username}`);
  console.log(`Received password: ${password}`);

  try {
    // check if user exists
    const user = await User.findOne({ username });
    console.log(`Found user: ${user}`);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        sub: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Remove token after 1 hour
   

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'teacher', 'student').required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  address: Joi.string(),
  aptSuiteUnit: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  phoneNumber: Joi.string(),
  dateOfBirth: Joi.date(),
  gender: Joi.string(),
});

// create a new user
exports.createUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { username, password, email, role, firstName, lastName, address, aptSuiteUnit, city, state, phoneNumber, dateOfBirth, gender } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      firstName,
      lastName,
      address,
      aptSuiteUnit,
      city,
      state,
      phoneNumber,
      dateOfBirth,
      gender,
    });
    await newUser.save();

    // Generate a JWT token for the newly created user
    const token = jwt.sign(
      {
        sub: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username already exists" });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ message: "Invalid user data", error: error.message });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }
};

