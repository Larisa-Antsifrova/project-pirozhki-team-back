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

  async findByActivationLink(activationLink) {
    return await UserModel.findOne({activationLink});
}

  async updateIsVerified(id, isVerified) {
    return await UserModel.updateOne({_id: id}, {isVerified});
}
}

module.exports = new Users();
