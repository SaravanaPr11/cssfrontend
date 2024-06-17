import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Axios interceptors for request and response
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Add token to headers
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Log successful responses if needed
        console.log('Response:', response);
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 403 Forbidden errors (token expired or insufficient permissions)
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refreshToken available');
            }

            // Request new access token using refresh token
            const { data } = await axios.post('http://localhost:2026/bankapps/api/v1/auth/refresh-token', {
              refreshToken
            });

            // Update tokens in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            if (data.refreshToken) {
              localStorage.setItem('refreshToken', data.refreshToken);
            }

            // Retry original request with new access token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            logout(); // Log out user or handle token refresh failure
            return Promise.reject(error); // Propagate the original error
          }
        }
        
        // Return any error
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up interceptors on component unmount
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []); // Empty dependency array ensures effect runs only once

  const login = (userData) => {
    setUser(userData);
    // Store tokens in localStorage upon login
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('cid', userData.customerId);
  };

  const logout = () => {
    setUser(null);
    // Clear tokens from localStorage upon logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Clear Authorization header in axios
    delete axios.defaults.headers.common['Authorization'];
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
