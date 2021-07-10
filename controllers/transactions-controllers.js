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

  async getTransactionById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const transactionId = req.params.transactionId;

      const [transaction] = await Transactions.getTransactionById(
        ownerId,
        transactionId
      );

      if (!transaction) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND,
          message: 'Transaction was not found.'
        });
      }

      return res.status(HttpCodes.OK).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { transaction }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTransactionById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const transactionId = req.params.transactionId;
      const updates = req.body;

      const updatedTransaction = await Transactions.updateTransaction(
        ownerId,
        transactionId,
        updates
      );

      if (!updatedTransaction) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND,
          message: 'Transaction was not found.'
        });
      }

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { transaction: updatedTransaction }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTransactionById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionControllers();
