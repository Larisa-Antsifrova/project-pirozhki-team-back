const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const UserModel = require('../models/user-model');
const mailService = require('../services/mail-service');
const tokenService = require('../services/token-service');

class Users {
  async getAllUsers() {}

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createNewUser(user) {
    return await UserModel.create(user);
  }

  async login(name, email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error(`User with this email was not found`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Wrong credentials');
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const tokens = tokenService.generateTokens({ ...payload });
    await tokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error('Email or password is wrong');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new Error('Email or password is wrong');
    }

    const user = await UserModel.findById(userData.id);

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const tokens = tokenService.generateTokens({ ...payload });
    await tokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }
}

module.exports = new Users();
