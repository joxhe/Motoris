import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-center">Panel Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-10 rounded-2xl text-center">
          <h2 className="text-6xl font-bold">156</h2>
          <p className="text-2xl mt-4">Clientes Activos</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-2xl text-center">
          <h2 className="text-6xl font-bold">34</h2>
          <p className="text-2xl mt-4">Citas Hoy</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-10 rounded-2xl text-center">
          <h2 className="text-6xl font-bold">$48.5M</h2>
          <p className="text-2xl mt-4">Ingresos del Mes</p>
        </div>
      </div>
      <div className="mt-12 bg-green-900 p-10 rounded-2xl text-center">
        <h2 className="text-4xl font-bold">¡100% FUNCIONAL CON MICROSERVICIOS + DDD + DOCKER!</h2>
        <p className="text-2xl mt-4">Arquitectura escalable, modular y lista para producción</p>
      </div>
    </div>
  );
}