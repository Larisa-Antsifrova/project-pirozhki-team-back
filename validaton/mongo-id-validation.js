const mongoose = require("mongoose");
const HttpCodes = require("../helpers/http-codes");
const Statuses = require("../helpers/statuses");
const Messages = require("../helpers/messages");

const validateMongoId = (req, res, next) => {
  const id = req.params.transactionId || req.params.categoryId;

  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: Statuses.ERROR,
      code: HttpCodes.BAD_REQUEST,
      message: Messages.INVALID_ID,
    });
  }

  next();
};

module.exports = validateMongoId;
