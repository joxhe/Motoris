const express = require('express');
const cors = require('cors');
const routes = require('./routes/inventory.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/parts', routes);

app.get('/', (req, res) => res.json({ service: "Inventory Service - MOTORIS", status: "OK" }));

app.listen(3005, () => console.log('Inventory Service en puerto 3005'));