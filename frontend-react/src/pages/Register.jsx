// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden');
    if (form.password.length < 6) return setError('Mínimo 6 caracteres');

    setLoading(true);
    try {
      await axios.post('http://localhost:3001/register', {
        name: form.name.trim() || 'Usuario',
        email: form.email,
        password: form.password,
        role: 'admin' // ← el primero que se registre será admin (cambias después)
      });
      alert('¡Cuenta creada! Ahora puedes iniciar sesión');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-400">MOTORIS</h1>
        <h2 className="text-3xl text-center text-white mb-8">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            type="text"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg placeholder-gray-400"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg placeholder-gray-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg"
            required
          />
          <input
            name="confirm"
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirm}
            onChange={handleChange}
            className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 p-5 rounded-lg font-bold text-2xl transition"
          >
            {loading ? 'Creando...' : 'REGISTRARSE'}
          </button>
        </form>

        {error && <p className="text-red-400 text-center mt-4 font-bold">{error}</p>}

        <p className="text-center mt-8 text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-blue-400 hover:underline font-bold">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}