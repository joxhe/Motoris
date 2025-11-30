// src/services/api.js
import axios from 'axios';

// Cliente principal: todo va por el API Gateway (con token)
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ← Aquí ponemos /api para que sea más limpio
  timeout: 10000,
});

// Cliente solo para autenticación (sin token y directo al auth-service)
const authApi = axios.create({
  baseURL: 'http://localhost:3001', // ← Directo al auth-service
  timeout: 10000,
});

// Interceptores: solo para las peticiones que van por el gateway
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptores para errores globales (opcional pero útil)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
export { authApi }; // ← Este lo usaremos solo para login y register