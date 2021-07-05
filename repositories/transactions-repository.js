const Transaction = require('../models/transaction-model');

const getAllTransactions = async () => {
  // TODO: Add search by owner ID
  return await Transaction.find();
};

const addTransaction = async transaction => {
  // TODO: Add owner field with current user ID
  return await Transaction.create({
    ...transaction,
  });
};

module.exports = {
  getAllTransactions,
  addTransaction,
};
