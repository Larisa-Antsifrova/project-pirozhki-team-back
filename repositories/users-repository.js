require("colors");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const UserModel = require("../models/user-model");
const mailService = require("../services/mail-service");
const tokenService = require("../services/token-service");

class AuthRepositories {
  async registration(name, email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      //TODO: доделать, чтоб возвращалась ошибкой 409 и статусом CONFLICT
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

    await mailService.sendActivationMail(email, activationLink);

    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    const tokens = tokenService.generateTokens({ ...payload });
    await tokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }

  async login(name, email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      //TODO: доделать, чтоб возвращалась ошибкой 400 и статусом BAD_REQUEST
      throw new Error(`User with this email - ${email} was not found`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      //TODO: доделать, чтоб возвращалась ошибкой 400 и статусом BAD_REQUEST
      throw new Error("Wrong credentials");
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const tokens = tokenService.generateTokens({ ...payload });
    await tokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new AuthRepositories();
