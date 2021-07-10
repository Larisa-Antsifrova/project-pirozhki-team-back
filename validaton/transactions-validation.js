const Joi = require('joi').extend(require('@joi/date'));
const HttpCodes = require('../helpers/http-codes');
const Categories = require('../helpers/categories');

const categoriesNames = Categories.map(category => category.name);

const createTransactionSchema = Joi.object({
  date: Joi.date().raw().format('YYYY-MM-DD').required(),
  income: Joi.boolean().required(),
  category: Joi.string()
    .trim()
    .valid(...categoriesNames)
    .required(),
  comment: Joi.string().trim().max(150).optional(),
  sum: Joi.number().min(0).required()
});

const paginateTransactionSchema = Joi.object({
  limit: Joi.number().min(0).optional(),
  offset: Joi.number().min(0).optional()
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
  validateCreatedTransaction: (req, _res, next) => {
    return validateRequestAgainstSchema(
      createTransactionSchema,
      req.body,
      next
    );
  },
  validatePaginationQueryParams: (req, _res, next) => {
    return validateRequestAgainstSchema(
      paginateTransactionSchema,
      req.query,
      next
    );
  }
};
