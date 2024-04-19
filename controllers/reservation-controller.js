const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addReservation = async (req, res, next) => {
  try {
    const rev = req.body;

    const newRev = await prisma.reservation.create({
      data: rev,
    });

    return res.status(201).json({
      message: 'Reservasi berhasil dilakukan',
      data: newRev,
    });
  } catch (error) {
    return next(error);
  }
};

const seeAllReservation = async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();

    return res.status(201).json({
      data: reservations,
    });
  } catch (error) {
    return next(error);
  }
};

const seeAllReservationToday = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reservations = await prisma.reservation.findMany(
      {
        where: {
          begin: {
            gte: today,
          },
          end: {
            gte: today,
          },
        },
      },
    );

    return res.status(201).json({
      data: reservations,
    });
  } catch (error) {
    return next(error);
  }
};

const removeReservation = async (req, res, next) => {
  try {
    const id = req.params;

    const isExist = await prisma.reservation.findUnique(
      {
        where: id,
      },
    );

    if (!isExist) {
      return res.status(404).json({
        message: 'Reservasi tidak ditemukan. Reservasi gagal dihapus',
      });
    }

    await prisma.reservation.delete({
      where: id,
    });

    return res.status(201).json({
      message: 'Reservasi berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
};

const updateReservationStatus = async (req, res, next) => {
  try {
    const id = req.params;
    const status = req.body;

    const isExist = await prisma.reservation.findUnique(
      {
        where: id,
      },
    );

    if (!isExist) {
      return res.status(404).json({
        message: 'Reservasi tidak ditemukan. Status reservasi gagal diubah',
      });
    }

    const newRev = await prisma.reservation.update({
      where: id,
      data: status,
    });

    return res.status(201).json({
      message: 'Status reservasi berhasil diubah.',
      data: newRev,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addReservation,
  seeAllReservation,
  seeAllReservationToday,
  updateReservationStatus,
  removeReservation,
};
