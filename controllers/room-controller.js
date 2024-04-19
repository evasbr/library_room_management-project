const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createRoom = async (req, res, next) => {
  try {
    const room = req.body;

    const newRoom = await prisma.room.create({
      data: room,
    });

    return res.status(201).json({
      message: 'Ruangan baru berhasil ditambahan',
      data: newRoom,
    });
  } catch (error) {
    return next(error);
  }
};

const seeAllRoom = async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany();

    return res.status(201).json({
      data: rooms,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createRoom, seeAllRoom };
