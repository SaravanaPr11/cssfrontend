import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2026/bankapps',
});

// Request interceptor to add the authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error('No refreshToken available');
        // Handle logout or redirect to login
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post('http://localhost:2026/bankapps/api/v1/auth/refresh-token', {
          refreshToken,
        });
        const { token } = data;

        // Update tokens in localStorage and axios default headers
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Handle refresh token failure, possibly redirect to login
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
