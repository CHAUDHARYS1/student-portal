// src/Routes.js
import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
// import Home from './Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
// import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <ReactRoutes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
      {/* Add more routes as needed */}
    </ReactRoutes>
  );
};

export default Routes;
