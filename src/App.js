// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { AuthProvider } from './authContext';

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
// import ProtectedRoute from './ProtectedRoute';
import AppHeader from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import AppFooter from './components/Footer/Footer';
import HomePage from './pages/HomePage'



const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

    <AuthProvider>
      <AppHeader />

      <Router>
        <Routes>
          <Route path='/' Component={HomePage} element={<HomePage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<Navigate to="/login" />} />


        </Routes>
      </Router>
      <AppFooter />
    </AuthProvider>
    </div>
  );
}

export default App;
