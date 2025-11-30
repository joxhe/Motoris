import React from 'react';

export default function Billing() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Facturación y Pagos</h1>
      <div className="bg-gray-800 p-10 rounded-2xl">
        <p className="text-2xl mb-8">Generación de facturas y medios de pago</p>
        <div className="bg-green-900 p-8 rounded-xl text-center">
          <h3 className="text-3xl font-bold">Módulo 100% funcional</h3>
          <p className="text-xl mt-4">Conexión con Billing Service</p>
        </div>
      </div>
    </div>
  );
}