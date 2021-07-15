require("dotenv").config();
const bcrypt = require("bcryptjs");
const Users = require("../repositories/users-repository");
const HttpCodes = require("../helpers/http-codes");
const Statuses = require("../helpers/statuses");
const Messages = require("../helpers/messages");
const expirationDate = require("../helpers/expiration-date");
const EmailService = require("../services/email");
const CreateSenderNodemailer = require("../services/mail-service");
const tokenService = require("../services/token-service");
const SALT_WORK_FACTOR = 10;

class AuthController {
  async registration(req, res, next) {
    try {
      const { name, email, password, activationLink } = req.body;

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

      const user = await Users.createNewUser({
        name,
        email,
        password: hashedPassword,
        activationLink,
      });

      //TODO: раскоментировать логику отправки письма при регистрации для продакшена
      // try {
      //   const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderNodemailer());
      //   await emailService.sendVerifyEmail(user.activationLink, user.email);
      // } catch (error) {
      //   console.log(error.message);
      // }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: expirationDate.maxCookieAge,
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

      //TODO: раскоментировать проверку на верификацию юзера при регистрации, можно объеденить с пред. проверкой
      // if (!user.isVerified) {
      //   return res.status(HttpCodes.UNAUTHORIZED).json({
      //     status: Statuses.ERROR,
      //     code: HttpCodes.UNAUTHORIZED,
      //     message: Messages.UNAUTHORIZED_USER_AUTH,
      //   });
      // }

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
        createdAt: user.createdAt,
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: expirationDate.maxCookieAge,
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
        createdAt: user.createdAt,
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: expirationDate.maxCookieAge,
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

  async verify(req, res, next) {
    try {
      const activationLink = req.params.link;
      const user = await Users.findByActivationLink(activationLink);
      if (user) {
        await Users.updateIsVerified(user.id, true);

        return res.json({
          status: Statuses.SUCCESS,
          code: HttpCodes.OK,
          message: Messages.VERIFY_SUCCESS,
        });
        //TODO: после деплоя фронта указать редирект на доменное имя клиента
        // return res.redirect(process.env.CLIENT_URL);
      }

      return res.status(HttpCodes.NOT_FOUND).json({
        status: Statuses.ERROR,
        code: HttpCodes.NOT_FOUND,
        message: Messages.NOT_FOUND_USER,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
