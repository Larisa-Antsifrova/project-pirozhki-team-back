require('colors');
const tokenService = require('../services/token-service');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');

const guard = (req, res, next) => {
  try {
    const headerAuth = req.headers.authorization;
    // console.log(headerAuth.blue); // консолим токен юзера для себя

    const accessToken = headerAuth?.split(' ')[1];

    const userData = tokenService.validateAccessToken(accessToken);

    if (!headerAuth || !accessToken || !userData) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: Statuses.ERROR,
        code: HttpCodes.UNAUTHORIZED,
        message: 'Not authorized.'
      });
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = guard;
