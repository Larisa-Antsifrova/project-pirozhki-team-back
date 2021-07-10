const Transactions = require('../repositories/transactions-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const calculateTotals = require('../helpers/total-calculator');

class TransactionControllers {
  async getTransactions(req, res, next) {
    try {
      const { id } = req.user;
      const query = req.query;

      const { transactions, ...pagination } =
        await Transactions.getPaginatedTransactions(id, query);

      const allTransactions = await Transactions.getAllTransactions(id);

      const totals = calculateTotals(allTransactions);

      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.CREATED,
        data: { transactions, pagination, totals }
      });
    } catch (error) {
      next(error);
    }
  }

  async addTransaction(req, res, next) {
    try {
      const transaction = req.body;
      const { id } = req.user;

      const addedTransaction = await Transactions.addTransaction(
        id,
        transaction
      );

      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: addedTransaction
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req, res, next) {}
  async updateTransactionById(req, res, next) {}
  async deleteTransactionById(req, res, next) {}
}

module.exports = new TransactionControllers();
