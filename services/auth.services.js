const jwt = require("jsonwebtoken")
const bcryptjs = require('bcryptjs')
const User = require('../models').user

class AuthService {

  static async login(email, password) {
    try {
     const user = await this.getUserWithPassword(email)

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        // throw new ErrorResponse(1201)
      }
      // Generar el JWT
      const token = await this.generateJWT({
        user: user.uuid
      })

      return token
    } catch (error) {
      throw error
    }
  }

  static async getUserWithPassword(email) {
		const user = await User.scope("withPassword").findOne({
			where: { email },
		})
		if (!user) {
			return null
		}
		return user
	}

  static async generateJWT(payload) {
    try {
      const token = await jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
        expiresIn: "4h",
      })
      return token
    } catch (error) {
      console.log(error)
      return "No se pudo generar el token";
    }
  }
}

module.exports = AuthService;
