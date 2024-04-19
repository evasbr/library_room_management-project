const memberControllers = require('./member-controller');
const roomControllers = require('./room-controller');
const reservationControllers = require('./reservation-controller');

module.exports = {
  ...memberControllers,
  ...roomControllers,
  ...reservationControllers,
};
