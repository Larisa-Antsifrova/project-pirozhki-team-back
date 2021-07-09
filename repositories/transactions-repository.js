const Transaction = require('../models/transaction-model');

class Transactions {
  async getAllTransactions(ownerId) {
    return await Transaction.find({ owner: ownerId });
  }

  async getAllTransactionsWithinPeriod(ownerId, startDate, endDate) {
    return await Transaction.find({
      owner: ownerId,
      date: { $gte: startDate, $lte: endDate }
    });
  }

  async addTransaction(id, transaction) {
    return await Transaction.create({
      ...transaction,
      owner: id
    });
  }
}

module.exports = new Transactions();
