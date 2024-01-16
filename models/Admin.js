// MongoDB data models
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
        // Email validation
    },
    phone: {
        type: Number,
        required: true
        // Range: 1000000000 - 9999999999
    },
    age: {
        type: Number,
        required: true
        // Range: 18 - 60
    },
    gender: {
        type: String,
        required: true
        // Enum: male, female
    },
    degree: {
        type: String,
        required: true
        // Enum: bachelors, masters, phd
    },
    experience: {
        type: Number,
        required: true
        // Range: 0 - 10 years
    },
    salary: {
        type: Number,
        required: true
        // Range: $10,000 - $100,000
    },
    employmentType: {
        type: String,
        required: true
        // Enum: full_time, part_time, contract, seasonal
    },
    jobTitle:{
        type: String,
        required: true
    },
    // Additional admin details
    created_at: {
        type: Date,
        default: Date.now
    },

});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;
