const express = require('express');
const cors = require('cors');
const routes = require('./routes/appointment.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/appointments', routes);

app.get('/', (req, res) => res.json({ service: "Appointment Service (CORE) - MOTORIS", status: "OK" }));

app.listen(3004, () => console.log('Appointment Service en puerto 3004'));