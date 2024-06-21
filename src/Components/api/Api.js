import axios from 'axios';
import { useAuth } from './AuthContext';

const api = axios.create({
  baseURL: 'http://localhost:2026/bankapps',
});

const setupInterceptors = (authContext) => {
  // Request interceptor to add the authorization header
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token expiration
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('Refresh Token:', refreshToken);

        if (!refreshToken) {
          console.error('No refreshToken available');
          authContext.logout();
          return Promise.reject(error);
        }

        try {
          const { data } = await axios.post('http://localhost:2026/bankapps/api/v1/auth/refresh-token', { refreshToken });
          const { token: newToken } = data;

          // Update tokens in localStorage and axios default headers
          localStorage.setItem('token', newToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

          // Update the auth context
          authContext.setUser((prevUser) => ({
            ...prevUser,
            token: newToken,
          }));

          // Retry original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          authContext.logout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export { api, setupInterceptors };
