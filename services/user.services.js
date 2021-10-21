const User = require('../models').user

module.exports = class UserService {
  static async getAllUsers() {
    const users = await User.findAll()
    return users
  }
}