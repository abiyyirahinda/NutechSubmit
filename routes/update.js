const express = require("express");
const { PrismaClient } = require('@prisma/client');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = express.Router();
const prisma = new PrismaClient();

router.put('/', jwtMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const { first_name, last_name } = req.body;

    if (!first_name) {
      return res.status(400).json({ status: 102, message: 'Parameter first_name harus di isi', data: null });
    }

    if (!last_name) {
        return res.status(400).json({ status: 102, message: 'Parameter last_name harus di isi', data: null });
    }

    const updatedProfile = await prisma.user.update({
      where: { email },
      data: {
        first_name,
        last_name,
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        profile_image: true,
      },
    });

    const defaultProfileImage = `${process.env.BASE_URL}/null`;
    const profileImage = updatedProfile?.profile_image || defaultProfileImage;
    res.status(200).json({ status: 0, message: 'Sukses', data:{...updatedProfile, profile_image: profileImage} }); 
  } catch (error) {
    console.error('Error during profile update:', error);
    res.status(500).json({ status: 1, message: 'Terjadi kesalahan pada server', data: null });
  }
});

module.exports = router;
