require("colors");
const authRepositories = require("../repositories/users-repository");
const HttpCodes = require("../helpers/http-codes");

class AuthController {
  //User registration
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const userData = await authRepositories.registration(name, email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  //User login
  async login(req, res, next) {
    try {
    } catch (error) {
      // next(error);
    }
  }

  //User logout
  async logout(req, res, next) {
    try {
    } catch (error) {
      // next(error);
    }
  }

  // Verify mail
  async verify(req, res, next) {
    try {
    } catch (error) {
      // next(error);
    }
  }
  //Test
  async getUsers(req, res, next) {
    try {
      res.json({ message: "Hello auth router" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
