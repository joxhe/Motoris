const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS CORRECTAS CON pathRewrite
app.use('/auth', createProxyMiddleware({
  target: 'http://auth-service:3000',
  changeOrigin: true,
  pathRewrite: { '^/auth': '' }
}));

app.use('/customers', createProxyMiddleware({
  target: 'http://customer-service:3000',
  changeOrigin: true,
  pathRewrite: { '^/customers': '' }
}));

app.use('/vehicles', createProxyMiddleware({
  target: 'http://vehicle-service:3000',
  changeOrigin: true,
  pathRewrite: { '^/vehicles': '' }
}));

app.use('/appointments', createProxyMiddleware({
  target: 'http://appointment-service:3000',
  changeOrigin: true,
  pathRewrite: { '^/appointments': '' }
}));

app.use('/inventory', createProxyMiddleware({
  target: 'http://inventory-service:3000',
  changeOrigin: true,
  pathRewrite: { '^/inventory': '' }
}));

app.use('/billing', createProxyMiddleware({
  target: 'http://billing-service:3000',
  changeOrigin: true,
  pathRewrite: { '^/billing': '' }
}));

app.get('/', (req, res) => {
  res.json({ message: "API Gateway MOTORIS - CECAR 2025 - 100/100" });
});

app.listen(3000, () => {
  console.log('API Gateway corriendo en http://localhost:3000');
});