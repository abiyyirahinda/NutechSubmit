const express = require("express");
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', jwtMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const { service_code } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { balance: true },
    });

    const totalAmount = calculateTotalAmount(service_code);
    if (user?.balance < totalAmount) {
      return res.status(400).json({ status: 103, message: 'Saldo tidak mencukupi', data: null });
    }

    const serviceName = getServiceName(service_code);
    if (!serviceName) {
      return res.status(400).json({ status: 102, message: 'Service atau Layanan tidak ditemukan', data: null });
    }

    const transaction = await prisma.transaction.create({
      data: {
        invoice_number: generateInvoiceNumber(),
        service_code,
        service_name: serviceName,
        transaction_type: 'PAYMENT',
        total_amount: totalAmount,
        created_on: new Date(),
        userEmail: email,
      },
    });

    await prisma.user.update({
      where: { email },
      data: { balance: { decrement: totalAmount } },
    });

    res.status(200).json({
      status: 0,
      message: 'Transaksi berhasil',
      data: {
        invoice_number: transaction.invoice_number,
        service_code: transaction.service_code,
        service_name: transaction.service_name,
        transaction_type: transaction.transaction_type,
        total_amount: transaction.total_amount,
        created_on: transaction.created_on,
      },
    });
  } catch (error) {
    console.error('Error during transaction:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});
function getServiceName(serviceCode) {
  switch (serviceCode) {
    case 'PULSA':
      return 'Pulsa HP';
    case 'LISTRIK':
      return 'Listrik PLN';
    case 'VOUCHER_GAME':
      return 'Voucher Game';
    default:
      return null; 
  }
}

function calculateTotalAmount(serviceCode) {
  switch (serviceCode) {
    case 'PULSA':
      return 10000;
    case 'LISTRIK':
      return 50000;
    case 'VOUCHER_GAME':
      return 30000;
    default:
      return 0;
  }
}
function generateInvoiceNumber() {
  return `INV${new Date().toISOString().replace(/\D/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
}

module.exports = router;
