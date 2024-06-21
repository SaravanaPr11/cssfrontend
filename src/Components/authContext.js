import React, { createContext, useState, useContext, useEffect } from 'react';
import { api, setupInterceptors } from './api/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const cid = localStorage.getItem('cid');

    if (token) {
      setUser({ token, name, cid });
    }

    setupInterceptors({ setUser, logout }); // Setup interceptors with the context functions
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/v1/auth/authenticate', { username, password });
      const { token, refreshToken, name, customerId } = response.data;

      // Store tokens and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('name', name);
      localStorage.setItem('cid', customerId);

      setUser({ token, name, cid: customerId });
    } catch (error) {
      console.error('Login error', error);
      throw error; // Propagate the error for handling in components
    }
  };

  const logout = () => {
    // Clear tokens and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    localStorage.removeItem('cid');

    // Clear user state
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
