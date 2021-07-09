const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const {
  validateCreatedTransaction
} = require('../validaton/transactions-validation');
const Controllers = require('../controllers/transactions-controllers');

const transactionsRoutes = Router();

transactionsRoutes.get('/transactions', guard, Controllers.getAllTransactions);
transactionsRoutes.post(
  '/transactions',
  guard,
  validateCreatedTransaction,
  Controllers.addTransaction
);

module.exports = transactionsRoutes;
