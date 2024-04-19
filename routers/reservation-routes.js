const express = require('express');
const {
  seeAllReservation, updateReservationStatus, removeReservation, seeAllReservationToday,
} = require('../controllers/index');

const validateUpdatedReservation = require('../middleware/validation/update-reservation-validation');

const router = express.Router();

router.get('/all', seeAllReservation);
router.get('/all/today', seeAllReservationToday);
router.delete('/:id', removeReservation);
router.put('/:id', validateUpdatedReservation, updateReservationStatus);

module.exports = router;
