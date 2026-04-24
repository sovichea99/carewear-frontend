import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/senji',
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json',
    'X-API-KEY': API_KEY,
  }
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;