const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.create({ data: req.body });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: "VIN o placa ya existe" });
  }
};

exports.getAll = async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) return res.status(404).json({ error: "Vehículo no encontrado" });
  res.json(vehicle);
};