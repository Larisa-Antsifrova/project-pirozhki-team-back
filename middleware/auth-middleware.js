const tokenService = require('../services/token-service');
const Users = require('../repositories/users-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const Messages = require('../helpers/messages');

const guard = async (req, res, next) => {
  try {
    const headerAuth = req.headers.authorization;

    const accessToken = headerAuth?.split(' ')[1];

    const payload = tokenService.validateAccessToken(accessToken);

    const requestedUser = await Users.getUserById(payload?.id);

    if (!headerAuth || !accessToken || !requestedUser) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: Statuses.ERROR,
        code: HttpCodes.UNAUTHORIZED,
        message: Messages.UNAUTHORIZED_TOKEN
      });
    }

    req.user = requestedUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = guard;
