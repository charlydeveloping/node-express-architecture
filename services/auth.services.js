const jwt = require("jsonwebtoken");

class AuthService {

	static async getUserWithPassword(email) {
		const user = await User.scope("withPassword").findOne({
			where: { email },
		});
		if (!user) {
			return null
		}
		return user
	}

  static async login(email, password) {
    try {
     const user = this.getUserWithPassword(email)

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        // throw new ErrorResponse(1201)
      }
      // Generar el JWT
      const token = await generarJWT(user.id);
      return token
    } catch (error) {}
  }

  static async generateJWT(user) {
    try {
      const token = await jwt.sign(user, process.env.SECRETORPRIVATEKEY, {
        expiresIn: "4h",
      });
      return token;
    } catch (error) {
      console.log(error);
      return "No se pudo generar el token";
    }
  }
}

module.exports = AuthService;
