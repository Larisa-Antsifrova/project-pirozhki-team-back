const mongoose = require('mongoose');
const HttpCodes = require('../helpers/http-codes');

const validateMongoId = (req, res, next) => {
  const id = req.params.transactionId;

  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: HttpCodes.BAD_REQUEST,
      message: 'Invalid transaction id.'
    });
  }

  next();
};

module.exports = validateMongoId;
