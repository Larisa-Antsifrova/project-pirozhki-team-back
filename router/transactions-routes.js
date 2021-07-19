const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const validateMongoId = require('../validaton/mongo-id-validation');
const {
  validateCreatedTransaction,
  validateUpdatedTransaction
} = require('../validaton/transactions-validation');
const {
  validateStatisticsQuery
} = require('../validaton/statistics-validation');
const Controllers = require('../controllers/transactions-controllers');

const transactionsRoutes = Router();

transactionsRoutes
  .get('/', guard, validateStatisticsQuery, Controllers.getTransactions)
  .post('/', guard, validateCreatedTransaction, Controllers.addTransaction);

transactionsRoutes
  .get(
    '/:transactionId',
    guard,
    validateMongoId,
    Controllers.getTransactionById
  )
  .put(
    '/:transactionId',
    guard,
    validateMongoId,
    validateUpdatedTransaction,
    Controllers.updateTransactionById
  )
  .delete(
    '/:transactionId',
    guard,
    validateMongoId,
    Controllers.deleteTransactionById
  );

module.exports = transactionsRoutes;
