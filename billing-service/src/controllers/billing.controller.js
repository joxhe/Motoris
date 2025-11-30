const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createInvoice = async (req, res) => {
  const invoice = await prisma.invoice.create({ data: req.body });
  res.status(201).json(invoice);
};

exports.getAll = async (req, res) => {
  const invoices = await prisma.invoice.findMany();
  res.json(invoices);
};

exports.payInvoice = async (req, res) => {
  const { id } = req.params;
  const invoice = await prisma.invoice.update({
    where: { id },
    data: { status: "pagada" }
  });
  res.json(invoice);
};