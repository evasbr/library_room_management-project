const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const memberUpdateSchema = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/),
  address: Joi.string(),
});

const validateUpdatedMember = (req, res, next) => {
  try {
    const { error } = memberUpdateSchema.validate(req.body);
    if (error) {
      throw new ClientError(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateUpdatedMember;
