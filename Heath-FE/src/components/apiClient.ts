import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api.com', // Base URL for the API
});

// Add a request interceptor to dynamically add the Bearer token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors
  }
);

export default apiClient;
