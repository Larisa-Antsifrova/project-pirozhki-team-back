const Transactions = require('../repositories/transactions-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const calculateTotals = require('../helpers/total-calculator');

class TransactionControllers {
  async getAllTransactions(req, res, next) {
    try {
      // TODO: refactor to getting All transactions of a specific user
      // TODO: paginate all transactions by 5 and sort by date
      const allTransactions = await Transactions.getAllTransactions();
      const totals = calculateTotals(allTransactions);

      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { allTransactions, totals },
      });
    } catch (error) {
      next(error);
    }
  }

  async addTransaction(req, res, next) {
    try {
      // TODO: Add owner field with current users ID
      const transaction = req.body;
      const addedTransaction = await Transactions.addTransaction(transaction);

      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: addedTransaction,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionControllers();
