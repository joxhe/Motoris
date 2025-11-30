const express = require('express');
const cors = require('cors');                 // ← NUEVO
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// REGISTER
app.post('/register', async (req, res) => {
  const { email, password, name = "Usuario", role = "user" } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role }
    });
    res.json({ message: "Usuario creado", user: { id: user.id, email: user.email } });
  } catch (e) {
    res.status(400).json({ error: "Email ya existe" });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "super-secreto-motoris-2025",
    { expiresIn: '24h' }
  );
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// Health check
app.get('/', (req, res) => {
  res.json({ service: "Auth Service - MOTORIS", status: "OK" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth Service en puerto ${PORT}`));