const express = require("express");
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 102, message: 'Parameter email tidak sesuai format', data: null });
    }

    if (!email ) {
      return res.status(400).json({ status: 102, message: 'Parameter email harus di isi', data: null });
    }
    if (!password ) {
      return res.status(400).json({ status: 102, message: 'Parameter password harus di isi', data: null });
    }

    const existingUser = await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;
    if (existingUser) {
      return res.status(400).json({ status: 102, message: 'Email sudah terdaftar', data: null });
    }

    await prisma.$queryRaw`
      INSERT INTO "User" (email, first_name, last_name, password)
      VALUES (${email}, ${first_name}, ${last_name}, ${password})
    `;

    res.status(200).json({ status: 0, message: 'Registrasi berhasil silahkan login', data: null });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});

module.exports = router;
