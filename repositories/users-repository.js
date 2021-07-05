// methods to work with User model in mongoDB
const UserModel = require("../models/user-model");
const { HttpCode } = require("../helpers/http-codes");
class AuthRepositories {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: `User with this email - ${email} is already exist`,
      });
    }

    const newUser = await UserModel.create({ email, password });
  }
}

module.exports = new AuthRepositories();
