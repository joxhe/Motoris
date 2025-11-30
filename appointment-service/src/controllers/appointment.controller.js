const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const appointment = await prisma.appointment.create({ data: req.body });
  res.status(201).json(appointment);
};

exports.getAll = async (req, res) => {
  const appointments = await prisma.appointment.findMany({ orderBy: { date: 'asc' } });
  res.json(appointments);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const appointment = await prisma.appointment.update({ where: { id }, data: { status } });
  res.json(appointment);
};