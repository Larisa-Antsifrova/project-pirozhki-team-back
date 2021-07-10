const UserModel = require('../models/user-model');

class Users {
  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createNewUser(user) {
    return await UserModel.create(user);
  }
}

module.exports = new Users();
