import "./App.css";
import React, { useEffect, useState,} from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes, useNavigate
} from "react-router-dom";


import SideBar from "./components/Sider/Sider";
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import AuthContext from "./authContext";
import { Layout, message } from "antd";
import CoursesList from "./components/Course/CoursesList";
import CourseDetails from "./components/Course/CourseDetails";
import LogOutSuccessPage from "./pages/LogoutSuccessPage";
// import ProtectedRoute from "./ProtectedRoute";
import SchoolCalendar from "./pages/CalenderPage";
import Upcoming from "./pages/UpcomingPage";
import FloatingGroup from "./components/FloatButton/FloatButton";
import UserProfile from "./components/User/userProfile";
import UserActivityMonitor from "./components/User/userActivityTracker";




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>

        <Router>
          
          {isLoggedIn ? <SideBar /> : null}
          <Routes>
         
           <Route path="/login" element={<Login />} />
            <Route path="/logout-success" element={<LogOutSuccessPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/courses" element={<CoursesList />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<SchoolCalendar />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/userprofile" element={<UserProfile />} />

            {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
            {/* route to home page if endpoint is not found */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>

          {isLoggedIn && <FloatingGroup />}
          {isLoggedIn && <UserActivityMonitor />}

        </Router>
        </AuthContext.Provider>

        <Layout>
        
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
