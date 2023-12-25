import React, { useState } from 'react';
import authService from '../../authService';

const Registration = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        try {
            // You may add additional fields for registration (e.g., email, name)
            const response = await authService.register(username, password);
            console.log('Registration successful. Response:', response);
            // Redirect or perform other actions upon successful registration
        } catch (error) {
            console.log('Registration failed. Error:', error);
            // Handle registration error, show a message, etc.

        }
    };


    return (
        <div>
            <h2>Registration</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegistration}>Register</button>
        </div>
    );

};

export default Registration;