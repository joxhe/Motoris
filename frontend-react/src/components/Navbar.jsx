import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-gray-800 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-400">MOTORIS</h1>
        <div className="flex items-center space-x-8">
          <NavLink to="/dashboard" className="hover:text-blue-400 text-lg">Dashboard</NavLink>
          <NavLink to="/clients" className="hover:text-blue-400 text-lg">Clientes</NavLink>
          <NavLink to="/vehicles" className="hover:text-blue-400 text-lg">Vehículos</NavLink>
          <NavLink to="/appointments" className="hover:text-blue-400 text-lg">Citas</NavLink>
          <NavLink to="/inventory" className="hover:text-blue-400 text-lg">Repuestos</NavLink>
          <NavLink to="/billing" className="hover:text-blue-400 text-lg">Facturación</NavLink>
          <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold">
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}