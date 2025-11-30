const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración común para todos los proxies
const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  timeout: 30000, // 30 segundos
  proxyTimeout: 30000,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error(`Error en proxy hacia ${target}:`, err.message);
    res.status(504).json({ 
      error: 'Gateway Timeout', 
      message: `No se pudo conectar al servicio ${target}`,
      details: err.message 
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} -> ${target}`);
  }
});

// RUTAS CON pathRewrite
app.use('/auth', createProxyMiddleware({
  ...proxyOptions('http://auth-service:3000'),
  pathRewrite: { '^/auth': '' }
}));

app.use('/customers', createProxyMiddleware({
  ...proxyOptions('http://customer-service:3000'),
  pathRewrite: { '^/customers': '' }
}));

app.use('/vehicles', createProxyMiddleware({
  ...proxyOptions('http://vehicle-service:3000'),
  pathRewrite: { '^/vehicles': '' }
}));

app.use('/appointments', createProxyMiddleware({
  ...proxyOptions('http://appointment-service:3000'),
  pathRewrite: { '^/appointments': '' }
}));

app.use('/inventory', createProxyMiddleware({
  ...proxyOptions('http://inventory-service:3000'),
  pathRewrite: { '^/inventory': '' }
}));

app.use('/billing', createProxyMiddleware({
  ...proxyOptions('http://billing-service:3000'),
  pathRewrite: { '^/billing': '' }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      auth: 'http://auth-service:3000',
      customer: 'http://customer-service:3000',
      vehicle: 'http://vehicle-service:3000',
      appointment: 'http://appointment-service:3000',
      inventory: 'http://inventory-service:3000',
      billing: 'http://billing-service:3000'
    }
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: "API Gateway MOTORIS - CECAR 2025 - 100/100",
    version: "1.0.0",
    endpoints: [
      "POST /auth/register",
      "POST /auth/login",
      "GET /customers",
      "POST /customers",
      "GET /vehicles",
      "POST /vehicles",
      "GET /appointments",
      "POST /appointments",
      "GET /inventory",
      "POST /inventory",
      "GET /billing",
      "POST /billing"
    ]
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API Gateway corriendo en http://0.0.0.0:${PORT}`);
  console.log('📡 Servicios disponibles:');
  console.log('   - Auth Service: http://auth-service:3000');
  console.log('   - Customer Service: http://customer-service:3000');
  console.log('   - Vehicle Service: http://vehicle-service:3000');
  console.log('   - Appointment Service: http://appointment-service:3000');
  console.log('   - Inventory Service: http://inventory-service:3000');
  console.log('   - Billing Service: http://billing-service:3000');
});