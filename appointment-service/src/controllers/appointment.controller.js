const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  try {
    const appointment = await prisma.appointment.create({ 
      data: req.body 
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creando cita:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({ 
      orderBy: { date: 'asc' } 
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await prisma.appointment.update({ 
      where: { id }, 
      data: { status } 
    });
    res.json(appointment);
  } catch (error) {
    console.error('Error actualizando cita:', error);
    res.status(400).json({ error: error.message });
  }
};