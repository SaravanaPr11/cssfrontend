// authContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from './api/Api'; // Adjust path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you can decode the JWT token and extract user info if needed
      // const decodedToken = decode(token);
      // setUser(decodedToken);
      setUser({ token }); // For simplicity, setting only token
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/v1/auth/authenticate', { username, password });
      const { token, refreshToken } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Optionally, decode JWT token and set user info
      // const decodedToken = decode(token);
      // setUser(decodedToken);
      setUser({ token }); // For simplicity, setting only token
    } catch (error) {
      console.error('Login error', error);
      throw error; // Propagate the error for handling in components
    }
  };

  const logout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    // Clear user state
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const authContextValue = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
