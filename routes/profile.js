const express = require("express");
const { PrismaClient } = require('@prisma/client');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = express.Router();
const prisma = new PrismaClient();
require('dotenv').config();
router.get('/', jwtMiddleware, async (req, res) => {
  try {
    const { email } = req.user;

    const userProfile = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        profile_image: true,
      },
    });

    const defaultProfileImage = `${process.env.BASE_URL}/null`;
    const profileImage = userProfile?.profile_image || defaultProfileImage;
    res.status(200).json({ status: 0, message: 'Sukses', data:{...userProfile, profile_image: profileImage} });
  } catch (error) {
    console.error('Error during profile retrieval:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});

module.exports = router;