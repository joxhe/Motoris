const express = require('express');
const cors = require('cors');                 // ← NUEVO
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// ==== CORS PARA DESARROLLO LOCAL ====
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true
}));
// =====================================

app.use(express.json());

// Tus rutas aquí (ejemplo appointment-service)
app.get('/appointments', async (req, res) => {
  const appointments = await prisma.appointment.findMany();
  res.json(appointments);
});

// Citas de hoy
app.get('/appointments/today', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const appointments = await prisma.appointment.findMany({
    where: { date: { contains: today } }
  });
  res.json(appointments);
});

app.post('/appointments', async (req, res) => {
  const appointment = await prisma.appointment.create({ data: req.body });
  res.status(201).json(appointment);
});

// Health check
app.get('/', (req, res) => {
  res.json({ service: "Appointment Service - MOTORIS", status: "OK" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Service corriendo en puerto ${PORT}`));