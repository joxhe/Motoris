const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addPart = async (req, res) => {
  const part = await prisma.part.create({ data: req.body });
  res.status(201).json(part);
};

exports.getAll = async (req, res) => {
  const parts = await prisma.part.findMany();
  res.json(parts);
};

exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const part = await prisma.part.update({ where: { id }, data: { quantity } });
  res.json(part);
};