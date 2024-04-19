const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const reservationSchema = Joi.object({
  idRoom: Joi.string().required(),
  idMember: Joi.string().required(),
  begin: Joi.date().required(),
  end: Joi.date().required().min(Joi.ref('begin')),
  status: Joi.string().valid('END', 'SCHEDULED', 'ONGOING'),
});

const validateReservation = (req, res, next) => {
  try {
    const { error } = reservationSchema.validate(req.body);

    if (error) {
      throw new ClientError(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateReservation;
