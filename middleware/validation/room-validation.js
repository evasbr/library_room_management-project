const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const roomSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('PRIVATEROOM', 'MEETINGROOM'),
});

const validateRoom = (req, res, next) => {
  try {
    const { error } = roomSchema.validate(req.body);
    if (error) {
      throw new ClientError(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateRoom;
