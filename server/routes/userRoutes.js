const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update user by ID
router.put('/:id', userController.updateUserById);

// Delete user by ID
router.delete('/:id', userController.deleteUserById);

// Create a new user with the role "student"
router.post('/create-student', userController.createStudentUser);

// Login user and return JWT token
router.post('/login', userController.loginUser);

// Protected route example - requires authentication
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'You have access to this protected route!', user: req.user });
});

module.exports = router;
