import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import authService from "./authService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Routes>
        <Route
            {...rest}
            render={(props) =>
                authService.isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Navigate to={{ pathname: "/login", state: { from: props.location } }} />   
                )
            }
        />
        </Routes>
    );
};

export default ProtectedRoute;