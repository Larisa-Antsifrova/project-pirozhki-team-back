const UserModel = require('../models/user-model');
const tokenService = require('../services/token-service');

class Users {
  async getAllUsers() {}

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createNewUser(user) {
    return await UserModel.create(user);
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
