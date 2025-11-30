const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customer.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/customers', customerRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Customer Service MOTORIS', status: 'activo' });
});

app.listen(3002, () => {
  console.log('Customer Service corriendo en puerto 3002');
});