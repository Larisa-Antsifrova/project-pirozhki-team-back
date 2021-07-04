const getAllTransactions = (req, res, next) => {
  try {
    res.json({ message: 'Hello from all transactions' });
  } catch (error) {
    next(error);
  }
};

const addTransaction = (req, res, next) => {
  try {
    res.json({ message: 'Hello from add new transactions' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransactions, addTransaction };
