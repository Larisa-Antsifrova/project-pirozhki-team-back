const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');

class UserController {
  async getCurrentUser(req, res, next) {
    try {
      const { name, email } = req.user;
      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { name, email }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
