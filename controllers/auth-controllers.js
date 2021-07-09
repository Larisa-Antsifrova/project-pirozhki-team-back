const authRepositories = require("../repositories/users-repository");
const HttpCodes = require("../helpers/http-codes");
const Statuses = require("../helpers/statuses");
class AuthController {
  //User registration
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const userData = await authRepositories.registration(name, email, password);

      //set in cookies refreshToken
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { userData },
      });
    } catch (error) {
      if (error.message === `User with this email is already exist`) {
        error.status = HttpCodes.CONFLICT;
      }
      next(error);
    }
  }

  //User login
  async login(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const userData = await authRepositories.login(name, email, password);

      //set in cookies refreshToken
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      if (error.message === `User with this email was not found`) {
        error.status = HttpCodes.NOT_FOUND;
      }
      if (error.message === `Wrong credentials`) {
        error.status = HttpCodes.BAD_REQUEST;
      }
      next(error);
    }
  }

  //User logout
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authRepositories.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(HttpCodes.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  }

  // Refresh token
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authRepositories.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      if (error.message === `Email or password is wrong`) {
        error.status = HttpCodes.UNAUTHORIZED;
      }
      next(error);
    }
  }
}

module.exports = new AuthController();
