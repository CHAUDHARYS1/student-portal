// Entry point to start your server.
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./config/passport");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
// Initialize Passport
app.use(passport.initialize());

// Add middleware to set the X-Content-Type-Options header
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

//middleware
app.use(bodyParser.json());

//import routes
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const statsRoutes = require("./routes/statsRoutes");

app.use("/api/users", userRoutes);
app.use("/api/students", validateToken, studentRoutes);
app.use("/api/teachers", validateToken, teacherRoutes);
app.use("/api/grades", validateToken, gradeRoutes);
app.use("/api/attendances", validateToken, attendanceRoutes);
app.use("/api/courses", validateToken, courseRoutes);
app.use("/api/stats", validateToken, statsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.get("/api/user", (req, res) => {
  res.json(userData);
});

app.use((req, res, next) => {
  const oldSend = res.send;

  res.send = function (data) {
    console.log(`Response status: ${res.statusCode}`);
    console.log(`Response body: ${data}`);
    res.send = oldSend;
    res.send(data);
  };

  next();
});
