import "./App.css";
import React, { useEffect, useState,} from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";


import SideBar from "./components/Sider/Sider";
import Dashboard from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import AuthContext from "./authContext";
import { Layout } from "antd";
import CoursesList from "./components/Course/CoursesList";
import CourseDetails from "./components/Course/CourseDetails";
import LogoutButton from "./components/Login/Logout";
import LogOutSuccessPage from "./pages/LogoutSuccessPage";
import ProtectedRoute from "./ProtectedRoute";
import SchoolCalendar from "./pages/CalenderPage";
import Upcoming from "./pages/UpcomingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>

        <Router>
          
          {isLoggedIn && <SideBar />}

          <Routes>
            <Route path="/" element={<HomePage />} />
            
           
            <Route path="/login" element={<Login />} />
            <Route path="/logout-success" element={<LogOutSuccessPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/courses" element={<CoursesList />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<SchoolCalendar />} />
            <Route path="/upcoming" element={<Upcoming />} />

            {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
            {/* route to home page if endpoint is not found */}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>

          {isLoggedIn && <LogoutButton />}
        </Router>
        </AuthContext.Provider>

        <Layout>
        
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
