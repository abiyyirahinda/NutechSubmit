const express = require("express");
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', jwtMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const { top_up_amount } = req.body;

    if (!top_up_amount || top_up_amount <= 0) {
      return res.status(400).json({ status: 102, message: 'Jumlah top up tidak valid', data: null });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        balance:  { 
            increment: top_up_amount 
        },
      },
      select: {
        balance: true,
      },
    });

    const newBalance = updatedUser?.balance;

    res.status(200).json({ status: 0, message: 'Top Up Balance berhasil', data: { balance: newBalance } });
  } catch (error) {
    console.error('Error during top-up:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});

module.exports = router;
