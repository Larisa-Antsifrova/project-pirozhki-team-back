const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
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
  .get('/transactions/:transactionId', guard, Controllers.getTransactionById)
  .put(
    '/transactions/:transactionId',
    guard,
    validateUpdatedTransaction,
    Controllers.updateTransactionById
  )
  .delete(
    '/transactions/:transactionId',
    guard,
    Controllers.deleteTransactionById
  );

module.exports = transactionsRoutes;
