const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const updateReservationSchema = Joi.object({
  status: Joi.string().valid('END', 'SCHEDULED', 'ONGOING'),
});

const validateUpdatedReservation = (req, res, next) => {
  try {
    const { error } = updateReservationSchema.validate(req.body);

    if (error) {
      throw new ClientError(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateUpdatedReservation;
