import React, { useState } from 'react';
import api from '../services/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@motoris.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data.token);
    } catch (err) {
      setError('Error de credenciales');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-6xl font-bold text-center mb-8 text-blue-400">MOTORIS</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} 
                 className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg" placeholder="Email" required />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} 
                 className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg" placeholder="Contraseña" required />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-5 rounded-lg font-bold text-2xl">
            INGRESAR
          </button>
          {error && <p className="text-red-400 text-center">{error}</p>}
        </form>
        <p className="text-center mt-8 text-green-400 text-xl font-bold">
          Usuario: admin@motoris.com | Pass: 123456
        </p>
      </div>
    </div>
  );
}