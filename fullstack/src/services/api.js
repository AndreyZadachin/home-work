import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || '/api';
const AUTH_TOKEN_KEY = process.env.VUE_APP_AUTH_TOKEN_KEY || 'accessToken';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
