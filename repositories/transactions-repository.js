const Transaction = require('../models/transaction-model');

class Transactions {
  async getTransactionById(ownerId, transactionId) {
    return await Transaction.find({ owner: ownerId, _id: transactionId });
  }

  async getAllTransactions(ownerId) {
    return await Transaction.find({ owner: ownerId });
  }

  async getPaginatedTransactions(ownerId, query) {
    const { limit = 5, offset = 0 } = query;

    const labels = {
      docs: 'transactions',
      totalDocs: 'totalTransactions',
      page: 'currentPage'
    };

    const options = {
      limit,
      offset,
      sort: { date: -1 },
      customLabels: labels
    };

    return await Transaction.paginate({ owner: ownerId }, options);
  }

  async getAllTransactionsWithinPeriod(ownerId, startDate, endDate) {
    return await Transaction.find({
      owner: ownerId,
      date: { $gte: startDate, $lte: endDate }
    });
  }

  async addTransaction(ownerId, transaction) {
    return await Transaction.create({
      ...transaction,
      owner: ownerId
    });
  }
}

module.exports = new Transactions();
