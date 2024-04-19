const express = require('express');
const { createUser, createRoom, addReservation } = require('../controllers/index');

const validateMember = require('../middleware/validation/member-validation');
const validateRoom = require('../middleware/validation/room-validation');
const validateReservation = require('../middleware/validation/reservation-validation');

const router = express.Router();

router.post('/user', validateMember, createUser);
router.post('/room', validateRoom, createRoom);
router.post('/reservation', validateReservation, addReservation);

module.exports = router;
