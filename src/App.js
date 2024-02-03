import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
// import { AuthProvider } from './authContext';


// import ProtectedRoute from './ProtectedRoute';
import AppHeader from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
// import AppFooter from './components/Footer/Footer';
import HomePage from "./pages/HomePage";
import Intro from "./pages/LoginRegisterPage";
import { FloatButton, Tooltip, Layout } from "antd";
import { LogoutOutlined, EllipsisOutlined } from "@ant-design/icons";
import CoursesList from "./components/Course/CoursesList";
import CourseDetails from "./components/Course/CourseDetails";


const App = () => {
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/intro" element={<Intro />} />
            {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path="/courses" element={<CoursesList />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* route to home page if endpoint is not found */}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <Layout>
      
          <FloatButton.Group
            trigger="click"
            style={{ right: 24 }}
            icon={<EllipsisOutlined />}
          >
            <Tooltip title="Logout">
              <FloatButton icon={<LogoutOutlined />} />
            </Tooltip>
          </FloatButton.Group>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
