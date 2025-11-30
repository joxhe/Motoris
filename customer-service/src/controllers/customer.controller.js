const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.create({ data: req.body });
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Cliente ya existe' });
  }
};

exports.getAllCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) return res.status(404).json({ error: 'Cliente no encontrado' });
  res.json(customer);
};0