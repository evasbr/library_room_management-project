const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const memberSchema = Joi.object({
  code_member: Joi.string().required(),
  name: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/).required(),
  address: Joi.string().required(),
});

const validateMember = (req, res, next) => {
  try {
    const { error } = memberSchema.validate(req.body);
    if (error) {
      throw new ClientError(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateMember;
