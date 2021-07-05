// Handlers for auth endpoints

class AuthController {
  //User registration
  async registration(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  //User login
  async login(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  //User logout
  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
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
