const Joi = require('joi');
const HttpCodes = require('../helpers/http-codes');

const createUserSchema = Joi.object({
  password: Joi.string().trim().min(6).max(12).required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  name: Joi.string().trim().min(1).max(30).optional()
});

const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().optional()
});

const validateRequestAgainstSchema = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message
    });
  }
};

module.exports = {
  validateCreatedUser: (req, _res, next) => {
    return validateRequestAgainstSchema(createUserSchema, req.body, next);
  },
  validateLoggedinUser: (req, _res, next) => {
    return validateRequestAgainstSchema(loginUserSchema, req.body, next);
  }
};
