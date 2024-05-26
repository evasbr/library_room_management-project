const express = require('express');

const reservationRoutes = require('./reservation-routes');
const createRoutes = require('./create-routes');
const memberRoutes = require('./member-routes');
const roomRoutes = require('./room-routes');
const authRoutes = require('./auth-routes');

const router = express.Router();

router.use('/new', createRoutes);
router.use('/user', memberRoutes);
router.use('/room', roomRoutes);
router.use('/reservation', reservationRoutes);
router.use('', authRoutes);

module.exports = router;
