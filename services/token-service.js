require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

const JWT_SECRET_KEY_ACCESS = process.env.JWT_SECRET_KEY_ACCESS;
const JWT_SECRET_KEY_REFRESH = process.env.JWT_SECRET_KEY_REFRESH;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY_ACCESS, {
      expiresIn: '2h',
    });
    const refreshToken = jwt.sign(payload, JWT_SECRET_KEY_REFRESH, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
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
}

module.exports = new TokenService();
