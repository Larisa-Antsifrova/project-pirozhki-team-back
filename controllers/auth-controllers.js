const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const Users = require("../repositories/users-repository");
const HttpCodes = require("../helpers/http-codes");
const Statuses = require("../helpers/statuses");
const Messages = require("../helpers/messages");
const mailService = require("../services/mail-service");
const tokenService = require("../services/token-service");
const maxCookieAge = require("../helpers/cookie-age");
const SALT_WORK_FACTOR = 10;

class AuthController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const candidate = await Users.getUserByEmail(email);

      if (candidate) {
        return res.status(HttpCodes.CONFLICT).json({
          status: Statuses.ERROR,
          code: HttpCodes.CONFLICT,
          message: Messages.CONFLICT_USER_AUTH,
        });
      }

      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hashedPassword = await bcrypt.hash(password, salt);

      const activationLink = uuid();

      const user = await Users.createNewUser({
        name,
        email,
        password: hashedPassword,
        activationLink,
      });

      await mailService.sendActivationMail(email, activationLink);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: maxCookieAge,
        httpOnly: true,
      });

      return res.status(HttpCodes.CREATED).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.CREATED,
        data: { ...tokens, user: payload },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Users.getUserByEmail(email);

      if (!user) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: Statuses.ERROR,
          code: HttpCodes.UNAUTHORIZED,
          message: Messages.UNAUTHORIZED_USER_AUTH,
        });
      }

      const isPasswordCorret = await bcrypt.compare(password, user.password);

      if (!isPasswordCorret) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: Statuses.ERROR,
          code: HttpCodes.UNAUTHORIZED,
          message: Messages.UNAUTHORIZED_USER_AUTH,
        });
      }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: maxCookieAge,
        httpOnly: true,
      });

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { ...tokens, user: payload },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await tokenService.removeToken(refreshToken);

      res.clearCookie("refreshToken");

      return res.status(HttpCodes.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: Statuses.ERROR,
          code: HttpCodes.UNAUTHORIZED,
          message: Messages.UNAUTHORIZED_USER_AUTH,
        });
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: Statuses.ERROR,
          code: HttpCodes.UNAUTHORIZED,
          message: Messages.UNAUTHORIZED_USER_AUTH,
        });
      }

      const user = await Users.getUserById(userData.id);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: maxCookieAge,
        httpOnly: true,
      });

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { ...tokens, user: payload },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
