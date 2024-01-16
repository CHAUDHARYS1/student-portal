import axios from "axios";

const API_URL = "http://localhost:3000";

// create auth service
const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            const { token } = response.data;
            authService.setToken(token);
            return token;
        } catch (error) {
            throw error;
        }       
    },

    registration: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { username, password });
            const { token } = response.data;
            authService.setToken(token);
            return response;
        } catch (error) {
            throw error;
        }
    },

    setToken: (token) => {
        localStorage.setItem('token', token);
    },

    getToken: () => {
        return localStorage.getItem('token');
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    isAuthenticated: () => {
        return !!authService.getToken();
    },
};

export default authService;