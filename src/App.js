import "./App.css";
import React, { useEffect, useState,} from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";


import AppHeader from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import AuthContext from "./authContext";
import { Layout } from "antd";
import CoursesList from "./components/Course/CoursesList";
import CourseDetails from "./components/Course/CourseDetails";
import LogoutButton from "./components/Login/Logout";
import LogOutSuccessPage from "./pages/LogoutSuccessPage";

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
          <AppHeader />

          <Routes>
            <Route path="/" element={<HomePage />} />
            
           
            <Route path="/login" element={<Login />} />
            <Route path="/logout-success" element={<LogOutSuccessPage />} />
            <Route path="/signup" element={<Signup />} />
            {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path="/courses" element={<CoursesList />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
