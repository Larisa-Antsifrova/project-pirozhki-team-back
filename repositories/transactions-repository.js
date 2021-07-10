const Transaction = require('../models/transaction-model');

class Transactions {
  async getAllTransactions(ownerId, query) {
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

  async addTransaction(id, transaction) {
    return await Transaction.create({
      ...transaction,
      owner: id
    });
  }
}

module.exports = new Transactions();
