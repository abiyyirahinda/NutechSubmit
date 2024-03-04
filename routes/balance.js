const express = require("express");
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', jwtMiddleware, async (req, res) => {
  try {
    const { email } = req.user;

    const userBalance = await prisma.user.findUnique({
      where: { email },
      select: {
        balance: true,
      },
    });

    const balance = userBalance?.balance || 0;

    res.status(200).json({ status: 0, message: 'Sukses', data: { balance } });
  } catch (error) {
    console.error('Error during balance retrieval:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});

module.exports = router;