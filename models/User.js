// MongoDB data models
// using mongoose here
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    role: {type: String, enum: ['teacher', 'student', 'administrator'], required: true },

    // Additional fields based on user roles
});

const User = mongoose.model('User', userSchema);
module.exports = User;
