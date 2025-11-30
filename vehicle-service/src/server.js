const express = require('express');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicle.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/vehicles', vehicleRoutes);

app.get('/', (req, res) => res.json({ service: "Vehicle Service - MOTORIS", status: "OK" }));

app.listen(3003, () => console.log('Vehicle Service en puerto 3003'));