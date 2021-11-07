const User = require('../models').user

module.exports = class UserService {
  /**
   * @description gets the list of users
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   */
  static async getAllUsers() {
    return await User.findAll()
  }
  /**
   * @description gets one user by its id
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   * @param {Number} id - identifier of the user.
   */
  static async getOneUser(id) {
    return await User.findOne({ where: { id } })
  }

  /**
   * @description gets one user by its uuid
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   * @param {String} uuid - identifier of the user.
   */
   static async getOneUserByUUID(uuid) {
    return await User.findOne({ where: { uuid } })
  }

  /**
   * @description creates a register of user
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   * @param {Object} user - object of type user.
   */
   static async createUser(user) {
    try {
      return await User.create({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        status: user.status,
        created_by: user.created_by,
        updated_by: user.updated_by
      })
    } catch (error) {
      throw error
    }
  }
  /**
   * @description updates a register of user
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   * @param {Object} user - object of type user
   */
  static async updateUser(user) {
    try {
      const userInstance = await this.getOneUser(user.id)

      if (!userInstance) return null

      return userInstance.update({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        status: user.status,
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * @description deletes a register of user by logic delete
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   * @param {Number} id - identifier of the user to be deleted.
   * @param {deletedBy} id - identifier of the user who deletes.
   */
   static async deleteUser(id, deletedBy) {
    try {
      const userInstance = await this.getOneUser(id)

      if (!userInstance) return null

      return await userInstance.destroy()
    } catch (error) {
      throw error
    }
  }
}