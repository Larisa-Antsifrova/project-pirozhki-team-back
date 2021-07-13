require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');
const expirationDate = require('../helpers/expiration-date');

const JWT_SECRET_KEY_ACCESS = process.env.JWT_SECRET_KEY_ACCESS;
const JWT_SECRET_KEY_REFRESH = process.env.JWT_SECRET_KEY_REFRESH;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY_ACCESS, {
      expiresIn: expirationDate.expiresInAccessToken
    });
    const refreshToken = jwt.sign(payload, JWT_SECRET_KEY_REFRESH, {
      expiresIn: expirationDate.expiresInRefreshToken
    });

    return {
      accessToken,
      refreshToken
    };
  }

  //check the access token for validity and expiration date
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS);

      return userData;
    } catch (error) {
      return null;
    }
  }

  //check the refresh token for validity and expiration date
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY_REFRESH);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.findOneAndRemove({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
