const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const Users = require('../repositories/users-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const mailService = require('../services/mail-service');
const tokenService = require('../services/token-service');

class AuthController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const candidate = await Users.getUserByEmail(email);

      if (candidate) {
        return res.status(HttpCodes.CONFLICT).json({
          status: Statuses.ERROR,
          code: HttpCodes.CONFLICT,
          message: 'The user with this email already exists.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const activationLink = uuid();

      const newUser = await Users.createNewUser({
        name,
        email,
        password: hashedPassword,
        activationLink
      });

      await mailService.sendActivationMail(email, activationLink);

      const payload = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true
      });

      return res.status(HttpCodes.CREATED).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.CREATED,
        data: { ...tokens, user: payload }
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const candidate = await Users.getUserByEmail(email);

      if (!candidate) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: Statuses.ERROR,
          code: HttpCodes.UNAUTHORIZED,
          message: 'Invalid credentials.'
        });
      }

      const isPasswordCorret = await bcrypt.compare(
        password,
        candidate.password
      );

      if (!isPasswordCorret) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: Statuses.ERROR,
          code: HttpCodes.UNAUTHORIZED,
          message: 'Invalid credentials.'
        });
      }

      const payload = {
        id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        isVerified: candidate.isVerified
      };

      const tokens = tokenService.generateTokens({ ...payload });
      await tokenService.saveToken(payload.id, tokens.refreshToken);

      //set refreshToken to cookies
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true
      });

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { ...tokens, user: payload }
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await tokenService.removeToken(refreshToken);

      res.clearCookie('refreshToken');

      return res.status(HttpCodes.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authRepositories.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
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
