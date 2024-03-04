// routes/login.js
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 102, message: 'Parameter email tidak sesuai format', data: null });
    }

    if (!email) {
        return res.status(400).json({ status: 102, message: 'Parameter email harus di isi', data: null });
      }
      if (!password ) {
        return res.status(400).json({ status: 102, message: 'Parameter password harus di isi', data: null });
      }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ status: 103, message: 'Email belum terdaftar', data: null });
    }
    if (user.password !== password) {
      return res.status(400).json({ status: 103, message: 'Username atau password salah', data: null });
    }
    const exp =  60 * 60 * 1;

    const token = jwt.sign({ email: user.email, memberCode: user.memberCode }, 'secret_key', { expiresIn: exp});

    res.status(200).json({ status: 0, message: 'Login Sukses', data: { token } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});


module.exports = router;
