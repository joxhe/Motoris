const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

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
    process.env.JWT_SECRET || "motoris-secret-2025",
    { expiresIn: '24h' }
  );
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.listen(3000, () => console.log('Auth Service en puerto 3000'));