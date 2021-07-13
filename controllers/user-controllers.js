const HttpCodes = require("../helpers/http-codes");
const Statuses = require("../helpers/statuses");

class UserController {
  getCurrentUser(req, res, next) {
    try {
      const { id, name, email, isVerified, createdAt } = req.user;

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { id, name, email, isVerified, createdAt },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
