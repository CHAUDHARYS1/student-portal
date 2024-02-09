import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import SideBar from "./components/Sider/Sider";
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import AuthContext from "./authContext";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CoursesList from "./components/Course/CoursesList";
import CourseDetails from "./components/Course/CourseDetails";
import LogOutSuccessPage from "./pages/LogoutSuccessPage";
import ProtectedRoute from './ProtectedRoute';
import SchoolCalendar from "./pages/CalenderPage";
import Upcoming from "./pages/UpcomingPage";
import FloatingGroup from "./components/FloatButton/FloatButton";
import UserProfile from "./components/User/userProfile";
import UserActivityMonitor from "./components/User/userActivityTracker";
import Logout from "./components/Login/Logout";
import AppFooter from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";

const { Header } = Layout;
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <AuthContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, handleLogout }}
        >
          <Router>
            {isLoggedIn && <SideBar collapsed={isSiderCollapsed} />}

            <Layout>
              {isLoggedIn && (
                <Header id="header">
                  <Button
                    icon={
                      isSiderCollapsed ? (
                        <MenuUnfoldOutlined />
                      ) : (
                        <MenuFoldOutlined />
                      )
                    }
                    onClick={() => setIsSiderCollapsed(!isSiderCollapsed)}
                    id="menu-trigger"
                  />
                    <Logout />
                </Header>
              )}

              {/* Pass the state to SideBar */}
              {/* Add a button to toggle the Sider */}
              {/* ... rest of your code ... */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout-success" element={<LogOutSuccessPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route exact path="/courses" element={<ProtectedRoute><CoursesList /></ProtectedRoute>} />
                <Route path="/courses/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><SchoolCalendar /></ProtectedRoute>} />
                <Route path="/upcoming" element={<ProtectedRoute><Upcoming /></ProtectedRoute>} />
                <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <HomePage />
                    )
                  }
                />
                {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
                {/* route to home page if endpoint is not found */}
                <Route path="/" element={<HomePage />} />
              </Routes>
              {isLoggedIn && <FloatingGroup />}
              {isLoggedIn && <UserActivityMonitor />}
              <AppFooter />
            </Layout>
          </Router>
        </AuthContext.Provider>
      </Layout>
    </div>
  );
};

export default App;
