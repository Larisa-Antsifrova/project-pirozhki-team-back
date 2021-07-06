require('colors');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const UserModel = require('../models/user-model');
const mailService = require('../services/mail-service');
const tokenService = require('../services/token-service');

class AuthRepositories {
  async registration(name, email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      //TODO: доделать, чтоб возвращалась ошибкой 409 и статусом CONFLICT в контроллере
      throw new Error(`User with this email - ${email} is already exist`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const activationLink = uuid();

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      activationLink,
    });

    await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/verify/${activationLink}`);

    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    const tokens = tokenService.generateTokens({ ...payload });
    await tokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }
}

module.exports = new AuthRepositories();
