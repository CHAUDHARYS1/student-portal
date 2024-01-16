import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
// import authService from "./authService";
// import { useAuth } from "./authContext";
import { AuthContext } from "./authContext";

const ProtectedRoute = ({ element, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
  
    return <Route {...rest} element={currentUser ? element : <Navigate to="/login" />} />;
};

export default ProtectedRoute;