import axios from 'axios';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:8000', // This will automatically prepend '/api' to all requests
  withCredentials: true,
  withXSRFToken: true
});

export const initCsrf = () => {
  return api.get('/sanctum/csrf-cookie');
};

export default api