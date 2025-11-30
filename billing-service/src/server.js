const express = require('express');
const cors = require('cors');
const routes = require('./routes/billing.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/invoices', routes);

app.get('/', (req, res) => res.json({ service: "Billing Service - MOTORIS", status: "OK" }));

app.listen(3006, () => console.log('Billing Service en puerto 3006'));