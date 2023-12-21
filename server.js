// Entry point to start your server.
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3000; 

// Initialize Passport
app.use(passport.initialize());


//Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/grading-engine', {
    // deprecation warnings below
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


//middleware
app.use(bodyParser.json());


//import routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendances', attendanceRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});