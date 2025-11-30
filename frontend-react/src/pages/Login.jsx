import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      
      {/* Fondo con efecto de partículas / luces */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Card principal */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10">
          
          {/* Logo + Título */}
          <div className="text-center mb-10">
            <h1 className="text-7xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
              MOTORIS
            </h1>
            <p className="text-gray-300 text-lg mt-3 font-light">Taller Automotriz Premium</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 text-lg"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 text-lg"
              required
            />

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-2xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'INGRESAR'}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center font-medium">
              {error}
            </div>
          )}

          {/* Botón de registro */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">¿Primera vez en Motoris?</p>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              CREAR CUENTA GRATIS
            </button>
          </div>

          {/* Footer */}
          <p className="text-center mt-10 text-gray-500 text-sm">
            © 2025 MOTORIS • Proyecto Final Sistemas Distribuidos
          </p>
        </div>
      </div>
    </div>
  );
}