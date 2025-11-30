// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// === TUS PÁGINAS ===
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Vehicles from './pages/Vehicles';
import Appointments from './pages/Appointments';
import Inventory from './pages/Inventory';
import Billing from './pages/Billing';
import Navbar from './components/Navbar';

// === COMPONENTE PROTEGIDO ===
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

// === APP PRINCIPAL ===
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verifica si hay token al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Función que recibe el Login
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      {/* Navbar solo si está autenticado */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* REDIRECCIÓN POR DEFECTO */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}