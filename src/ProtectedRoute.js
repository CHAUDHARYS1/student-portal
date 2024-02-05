import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        navigate('/');
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
};

export default ProtectedRoute;