import React, { useState } from 'react';
import { useAuth } from '../../authContext';
import authService from '../../authService';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {

    try {
      const response = await authService.login(username, password);
      console.log('Login successful', response.data);
      login(response.data.user)
    } catch (error) {
      console.log('Login failed', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )

}

export default Login;