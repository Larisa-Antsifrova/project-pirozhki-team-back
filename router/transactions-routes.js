const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const validateMongoId = require('../validaton/mongo-id-validation');
const {
  validateCreatedTransaction,
  validateUpdatedTransaction,
  validatePaginationQueryParams
} = require('../validaton/transactions-validation');
const Controllers = require('../controllers/transactions-controllers');

const transactionsRoutes = Router();

transactionsRoutes
  .get(
    '/transactions',
    guard,
    validatePaginationQueryParams,
    Controllers.getTransactions
  )
  .post(
    '/transactions',
    guard,
    validateCreatedTransaction,
    Controllers.addTransaction
  );

transactionsRoutes
  .get(
    '/transactions/:transactionId',
    guard,
    validateMongoId,
    Controllers.getTransactionById
  )
  .put(
    '/transactions/:transactionId',
    guard,
    validateMongoId,
    validateUpdatedTransaction,
    Controllers.updateTransactionById
  )
  .delete(
    '/transactions/:transactionId',
    guard,
    validateMongoId,
    Controllers.deleteTransactionById
  );

module.exports = transactionsRoutes;
