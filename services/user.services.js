const User = require('../models').user

module.exports = class UserService {
  async index() {
    const users = await User.findAll()
    return users
  }
}