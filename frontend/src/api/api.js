// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Change this if your backend runs on a different port
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
