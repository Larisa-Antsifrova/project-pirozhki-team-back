const Transactions = require('../repositories/transactions-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');

const getAllTransactions = async (req, res, next) => {
  try {
    const allTransactions = await Transactions.getAllTransactions();

    res.json({
      status: Statuses.SUCCESS,
      code: HttpCodes.OK,
      data: allTransactions,
    });
  } catch (error) {
    next(error);
  }
};

const addTransaction = async (req, res, next) => {
  try {
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
};

module.exports = { getAllTransactions, addTransaction };
