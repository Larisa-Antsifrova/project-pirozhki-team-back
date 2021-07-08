const Joi = require("joi");
const HttpCodes = require("../helpers/http-codes");

const schemaCreateUser = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  name: Joi.string().trim().optional(),
});

const validateSchema = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: `${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports = {
  schemaCreateUser: (req, _res, next) => {
    return validateSchema(schemaCreateUser, req.body, next);
  },
};
