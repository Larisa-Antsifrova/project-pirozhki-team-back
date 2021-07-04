const Transaction = require('../models/transaction-model');

const getAllTransactions = async () => {
  return await Transaction.find();
};

const addTransaction = async transaction => {
  return await Transaction.create({
    ...transaction,
  });
};

module.exports = {
  getAllTransactions,
  addTransaction,
};
