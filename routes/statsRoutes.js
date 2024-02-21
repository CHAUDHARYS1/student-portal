// statsRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course'); 
const Student = require('../models/Student'); 
const Teacher = require('../models/Teacher'); 

router.get('/', async (req, res) => {
    const students = await Student.countDocuments({});
    const teachers = await Teacher.countDocuments({});
    const courses = await Course.countDocuments({});
    const admins = await User.countDocuments({ role: 'admin' });
   

    res.json({
        students,
        teachers,
        admins,
        courses,
      
    });
});

module.exports = router;